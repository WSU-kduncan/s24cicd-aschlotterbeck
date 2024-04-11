Aaron Schlotterbeck  
Spring 2024  
CEG 3120: Project 05  

## Semantic Versioning  

* CD Project Overview
    - (What are you doing, why, what tools?)

* How to generate a `tag` in `git` / GitHub?
    - You can generate either annotated tags in `git / GitHub` or you can generate lightweight tags.
    - Lightweight tags are created by using the command `git tag <tag-name>`.
        * An example would be `git tag v1.1.1`, which would generate a tag named `v1.1.1`.
    - Annotated tags are created by using the command `git tag -a <tag-name> -m "tag-message"`.
        * An example would be `git tag -a v1.1.2 -m "Creating updated version v1.1.2`.
    - After tags have been generated locally, they can then be pushed to your GitHub repository using the following commands:
        * The same command will push lightweight or annotated tags to your GitHub respository.
            - `git push origin <tag-name>`.
            - The lightweight tag would be `git push origin v1.1.1`.
            - The annotated tag would be `git push origin v1.1.2`.
    - You can also push multiple tags using `git push --tags`.
    - Tags can also be removed locally and remotely.
        * Locally, you can use `git tag -d <tag-name>`.
        * Remotely, you can use `git push origin --delete <tag-name>`.  

* Behavior of GitHub workflow
    - What does it do and when?
        * My GitHub workflow is triggered whenever there is a push to the main branch of my GitHub repository and any tags that match the pattern 'v*.*'. My GitHub Actions file builds a Docker image from the included codebase and pushes it to my DockerHub account under the specified tags (versions: latest, major, & major.minor) included in the GitHub Actions file.  

			- Trigger: this establishes that the workflow is triggered when there is a push to the main branch of my GitHub repository and any tags that match the pattern 'v*.*'.
			```
			on:
			  push:
			    branches:
			      - 'main'
                tags:
                  - 'v*.*'
            ```
            - Jobs: There is one job included in this workflow referenced by `docker`. This will run on the `ubuntu-latest` environment.
            ```
            jobs:
			  docker:
			    runs-on: ubuntu-latest
            ```
            - Steps:
				* Checkout: this action checks out the code from the repository.
                * Docker meta: generates metadata for the docker image based on the repository and current ref (branch and tag). The action utilizes the included semantic versioning patterns to generate tags.
                * Set up QEMU: uses the "docker/setup-qemu-action" to setup QEMU.
				* Set up Docker Buildx: uses the "docker/setup-buildx-action" to setup Docker Buildx.
				* Login to DockerHub: uses "docker/login-action" to login to Docker Hub using GitHub secrets credentials.
                * Login to GHCR: uses "docker/login-action" to login to GitHub Container Registry using GitHub secrets credentials.
				* Build and push: uses "docker/build-push-action" to build and push the container image to the specified DockerHub repository. Uses Docker metadata (generated from 'steps: Docker meta' to output tags/labels).
			```
                steps:
                  -
                    name: Checkout
                    uses: actions/checkout@v4
                  -
                    name: Docker meta
                    id: meta
                    uses: docker/metadata-action@v5
                    with:
                      images: |
                        aschlotterbeck/ceg3120
                      tags: |
                        type=ref,event=branch
                        type=semver,pattern={{major}}
                        type=semver,pattern={{major}}.{{minor}}
                  -
                    name: Set up QEMU
                    uses: docker/setup-qemu-action@v3
                  -
                    name: Set up Docker Buildx
                    uses: docker/setup-buildx-action@v3
                  -
                    name: Login to Docker Hub
                    uses: docker/login-action@v3
                    with:
                      username: ${{ secrets.DOCKERHUB_USERNAME }}
                      password: ${{ secrets.DOCKERHUB_TOKEN }}
                  -
                    name: Login to GHCR
                    uses: docker/login-action@v3
                    with:
                      registry: ghcr.io
                      username: ${{ github.repository_owner }}
                      password: ${{ secrets.GITHUB_TOKEN }}
                  -
                    name: Build and push
                    uses: docker/build-push-action@v5
                    with:
                      context: .
                      push: ${{ github.event_name != 'pull_request' }}
                      #push: true
                      tags: ${{ steps.meta.outputs.tags }}
                      labels: ${{ steps.meta.outputs.labels }}
            ```

* Link to Docker Hub repository (as additional proof)  
    - https://hub.docker.com/repository/docker/aschlotterbeck/ceg3120/general  

## Deployment  

* How to install Docker to your instance?
* Container restart script
    - Justification & description of what it does
    - Where it should be on server
* Setting up a `webhook` on the server
    - How to install adnanh's `webhook` to server
    - How to start the `webhook`
        * Since our instance's reboot, we need to handle this
* `webhook` task definition file
    - Description of what it does
    - Where it should be on server
* How to configure GitHub OR DockerHub to message the listener  

## Demonstration  

* Either in-person demonstration OR video file showing full CI / CD workflow in action  

## Diagramming  

* Logically diagrammed steps for continuous deployment workflow  

## References  
* ChatGPT
