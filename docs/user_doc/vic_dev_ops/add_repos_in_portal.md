# Add Registries to the Management Portal #

You can add multiple registries to gain access to both public and private images.

vSphere Integrated Containers can interact with both Docker Registry HTTP API V1 and V2 in the following manner:

Protocol | Description
------------ | -------------
**V1 over HTTP (unsecured, plain HTTP registry)** | You can freely search this kind of registry, but you must manually configure each Docker host with the `--insecure-registry` flag to provision containers based on images from insecure registries. You must restart the Docker daemon after setting the property.
**V1 over HTTPS** | Use behind a reverse proxy, such as NGINX. The standard implementation is available through open source at https://github.com/docker/docker-registry.
**V2 over HTTPS** | The standard implementation is open sourced at https://github.com/docker/distribution.
**V2 over HTTPS with basic authentication** | The standard implementation is open sourced at https://github.com/docker/distribution.
**V2 over HTTPS with authentication through a central service** | You can run a Docker registry in standalone mode, in which there are no authorization checks.


**Procedure**

1. In the management portal, navigate to **Templates** > **Registries** and click **Add**.
2. If you add a registry that requires certificate, configure the certificates to be used for authentication.
	1. On the right, click **Credentials** and click **Add**.
	2. In the **New Credential** dialog box, enter name and click the **Certificate** radio button.
	3. In the **Public certificate** text box, enter the content of the *cert.pem* file.
	4. In the **Private certificate** text box, enter the content of the *key.pem* file. 
5. In the Add Registry dialog box, configure the registry settings.
	1. As address, enter the IP or hostname of the registry and the port.
    
    If you add Harbor, enter https://*hostname*:443.
	2. Enter name for the registry.
	3. Select the login credential and click **Verify**.
	4. If prompted to trust the registry certificate, click **OK**.
	5. After successful verification, click **Save**.


**Result**

The registry appears on the Registries page and you can access the images stored in that registry.