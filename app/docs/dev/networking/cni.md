---
---
# Kuma CNI

The operation of the Kuma data plane proxy,
precludes that all the relevant inbound and outbound traffic on the host (or container)
that runs the service is diverted to pass through the proxy itself.
This is done through [transparent proxying](../transparent-proxying),
which is set up automatically on Kubernetes.
Installing it requires certain privileges,
which are delegated to pre-sidecar initialisation steps.
There are two options to do this with Kuma:

* use the standard `kuma-init`, which is the default
* use the Kuma CNI

Kuma CNI can be leveraged in the two installation methods for Kubernetes: using [`kumactl`](../../installation/kubernetes) and with [Helm](../../installation/helm).
The default settings are tuned for OpenShift with Multus,
therefore to use it in other environments we need to set the relevant configuration parameters.

{% warning %}
Kuma CNI applies NetworkAttachmentDefinition(NAD) to applications in a namespace with `kuma.io/sidecar-injection` label.
To apply NAD to the applications not in a Mesh, add the label `kuma.io/sidecar-injection` with the value `disabled` to the namespace.
{% endwarning %}

## Installation

Below are the details of how to set up Kuma CNI in different environments using both `kumactl` and `helm`.

{% tabs useUrlFragment=false %}
{% tab Calico %}

{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-calico.conflist"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-calico.conflist" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% tab K3D with Flannel %}
{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/var/lib/rancher/k3s/agent/etc/cni/net.d" \
  --set "cni.binDir=/bin" \
  --set "cni.confName=10-flannel.conflist"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/var/lib/rancher/k3s/agent/etc/cni/net.d" \
  --set "cni.binDir=/bin" \
  --set "cni.confName=10-flannel.conflist" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% tab Kind %}
{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-kindnet.conflist"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-kindnet.conflist" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% tab Azure %}
{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-azure.conflist"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-azure.conflist" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% tab AWS - EKS %}
{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-aws.conflist"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/opt/cni/bin" \
  --set "cni.confName=10-aws.conflist" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% tab Google - GKE %}

You need to [enable network-policy](https://cloud.google.com/kubernetes-engine/docs/how-to/network-policy) in your cluster (for existing clusters this redeploys the nodes).

{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/home/kubernetes/bin" \
  --set "cni.confName=10-calico.conflist"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
  --set "cni.chained=true" \
  --set "cni.netDir=/etc/cni/net.d" \
  --set "cni.binDir=/home/kubernetes/bin" \
  --set "cni.confName=10-calico.conflist" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% tab OpenShift 3.11 %}

1. Follow the instructions in [OpenShift 3.11 installation](../installation/openshift/#_2-run-kuma)
to get the `MutatingAdmissionWebhook` and `ValidatingAdmissionWebhook` enabled (this is required for regular kuma installation).

2. You need to grant privileged permission to kuma-cni service account:

```shell
oc adm policy add-scc-to-user privileged -z kuma-cni -n kube-system
```

{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true" \
  --set "cni.containerSecurityContext.privileged=true"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
  --set "cni.containerSecurityContext.privileged=true" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% tab OpenShift 4 %}

{% tabs useUrlFragment=false %}
{% tab kumactl %}

```shell
kumactl install control-plane \
  --set "cni.enabled=true"
```

{% endtab %}
{% tab Helm %}

```shell
helm install --create-namespace --namespace kuma-system \
  --set "cni.enabled=true" \
   kuma kuma/kuma
```

{% endtab %}
{% endtabs %}
{% endtab %}

{% endtabs %}

### Kuma CNI Logs

Logs of the CNI plugin are available in `/tmp/kuma-cni.log` on the node and the logs of the installer are available via `kubectl logs`.

## Kuma CNI v2

The v2 version of the CNI is using [kuma-net](https://github.com/kumahq/kuma-net/) engine to do transparent proxying.

To install v2 CNI append the following options to the command from [installation](#installation):

```
--set ... \
--set "cni.enabled=true" \
--set "experimental.cni=true"
```

Currently, the v2 CNI is behind an `experimental` flag, but it's intended to be the default CNI in future releases.

### Kuma v2 CNI Taint controller

To prevent a race condition described in [this issue](https://github.com/kumahq/kuma/issues/4560) a new controller was implemented.
The controller will taint a node with `NoSchedule` taint to prevent scheduling before the CNI DaemonSet is running and ready.
Once the CNI DaemonSet is running and ready it will remove the taint and allow other pods to be scheduled into the node.

To disable the taint controller use the following env variable:

```
KUMA_RUNTIME_KUBERNETES_NODE_TAINT_CONTROLLER_ENABLED=false
```

### Kuma CNI v2 Logs

Logs of the new CNI plugin and the installer logs are available via `kubectl logs`.

## Merbridge CNI with eBPF

To install merbridge CNI with eBPF append the following options to the command from [installation](#installation):

```
--set ... \
--set "cni.enabled=true" \
--set "experimental.ebpf.enabled=true"
```

### Merbridge CNI with eBPF Logs

Logs of the installer of Merbridge CNI with eBPF are available via `kubectl logs`.
