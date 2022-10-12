---
---
## kumactl install

Install various Kuma components.

### Synopsis

Install various Kuma components.

### Options

```
  -h, --help   help for install
```

### Options inherited from parent commands

```
      --api-timeout duration   the timeout for api calls. It includes connection time, any redirects, and reading the response body. A timeout of zero means no timeout (default 1m0s)
      --config-file string     path to the configuration file to use
      --log-level string       log level: one of off|info|debug (default "off")
      --no-config              if set no config file and config directory will be created
```

### SEE ALSO

* [kumactl](kumactl)	 - Management tool for Kuma
* [kumactl install control-plane](kumactl_install_control-plane)	 - Install Kuma Control Plane on Kubernetes
* [kumactl install crds](kumactl_install_crds)	 - Install Kuma Custom Resource Definitions on Kubernetes
* [kumactl install demo](kumactl_install_demo)	 - Install Kuma demo on Kubernetes
* [kumactl install dns](kumactl_install_dns)	 - Install DNS to Kubernetes
* [kumactl install gateway](kumactl_install_gateway)	 - Install ingress gateway on Kubernetes
* [kumactl install logging](kumactl_install_logging)	 - Install Logging backend in Kubernetes cluster (Loki)
* [kumactl install metrics](kumactl_install_metrics)	 - Install Metrics backend in Kubernetes cluster (Prometheus + Grafana)
* [kumactl install tracing](kumactl_install_tracing)	 - Install Tracing backend in Kubernetes cluster (Jaeger)
* [kumactl install transparent-proxy](kumactl_install_transparent-proxy)	 - Install Transparent Proxy pre-requisites on the host

