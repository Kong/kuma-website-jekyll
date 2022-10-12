# Data plane proxy

A **data plane proxy (DPP)** is the part of Kuma that runs next to each workload that is a member of the mesh.
A DPP is composed of the following components:

- a `Dataplane` entity defines the configuration of the DPP
- a `kuma-dp` binary runs on each instance that is part of the mesh. This binary spawns the following subprocesses:
  - `Envoy` receives configuration from the control-plane to manage traffic correctly 
  - `core-dns` resolves Kuma specific DNS entries

::: tip
Data plane proxies are also called sidecars.
:::

We have one instance of `kuma-dp` for every instance of every service.

<center>
<img src="/images/docs/0.4.0/diagram-11.jpg" alt="" style="width: 500px; padding-top: 20px; padding-bottom: 10px;"/>
</center>

## Concepts

### Inbound

An inbound consists of:

- a set of tags
- the port the workload listens on

Most of the time a DPP exposes a single inbound. When a workload exposes multiple ports, multiple inbounds can be defined.

### Tags
Tags are a set of key-value pairs (.e.g `version=v2`) that are defined for each DPP inbound. These tags serve the following purposes:

- specifying the service this DPP inbound is part of
- adding metadata about the exposed service
- allowing subsets of DPPs to be selected by these tags

Tags prefixed with `kuma.io` are reserved:

* `kuma.io/service` identifies the service name. On Kubernetes this tag is automatically created, while on Universal it must be specified manually. This tag must always be present.
* `kuma.io/zone` identifies the zone name in a [multi-zone deployment](../deployments/multi-zone.md). This tag is automatically created and cannot be overwritten.
* `kuma.io/protocol` identifies [the protocol](../policies/protocol-support-in-kuma.md) of the service exposed by this inbound. Accepted values are `tcp`, `http`, `http2`, `grpc` and `kafka`.

### Service
A service is a group of all DPP inbounds that have the same `kuma.io/service` tag.

### Outbounds
An outbound allows the workload to consume a service in the mesh using a local port.
This is only useful when not using [transparent-proxy](../networking/transparent-proxying.md). 

## `Dataplane` entity

The `Dataplane` entity consists of:

- the IP address used by other DPPs to connect to this DPP
- inbounds
- outbounds

A `Dataplane` entity must be present for each DPP. `Dataplane` entities are managed differently depending on the environment: 

- Kubernetes: The control plane [**automatically generates**](dpp-on-kubernetes.md) the `Dataplane` entity. 
- Universal: The [**user defines**](dpp-on-universal.md) the `Dataplane` entity. 
 
For more details check the [dataplane specification](../generated/resources/proxy_dataplane.md):

## Dynamic configuration of the data plane proxy 

When the DPP runs:
- The `kuma-dp` retrieves Envoy startup configuration from the control plane.
- The `kuma-dp` process starts Envoy with this configuration.
- Envoy connects to the control plane using XDS and receives configuration updates when the state of the mesh changes.

The control plane uses policies and `Dataplane` entities to generate the DPP configuration. 

<center>
<img src="/images/docs/0.4.0/diagram-10.jpg" alt="" style="width: 500px; padding-top: 20px; padding-bottom: 10px;"/>
</center>
