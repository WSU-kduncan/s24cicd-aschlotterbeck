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
