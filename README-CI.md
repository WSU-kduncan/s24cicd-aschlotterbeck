Aaron Schlotterbeck  
Spring 2024  
CEG 3120: Project 04  

Part 1 -> Dockerize It  
* CI Project Overview  

	- (what are you doing, why, what tools?)  

![filler image for diagramming image as a reminder to complete for project](Optimus-Prime.jpg)  

* Run Project Locally  

	- How to install dependencies (WSL2).
		* To install WSL2 on Windows 11, you can open Powershell in administrator mode and select "Run as Administrator", then enter the command `wsl --install`. This will install, setup, and enable the required features to run WSL, and by default, install the Ubuntu distribution of Linux.
		* You do have the option to change the default Linux distribution that is installed. This can be accomplished by using `wsl --install -d <distribution name>` and then replacing `<distribution name>` with your preferred distro.
		* To view the list of available Linux distributions available, enter the command `wsl -l -o`.
		* Additional Linux distributions can be installed following the initial installation by using the command `wsl --install -d <distribution name>`.
		* In Powershell, I used `wsl -v -l` to confirm that I am currently running WSL version 2.2.1.0.  

	- How to install docker.
		* I am running Ubuntu 22.04.4 LTS on my device and had to use `sudo apt install docker.io` to install Docker.
		* After installation, I used `which docker` to locate the executable files.
		* I also used `docker --version` to identify current version that was installed, which was Docker version 24.0.5.
		* Lastly, I used `systemctl status docker` to confirm Docker was, in fact, installed and up and running on my system.
		* To use Docker commands without using sudo, I used `sudo usermod -aG docker ubuntu` to add my user to the Docker group.  

	- How to build a container image from the `Dockerfile`.
		* To build a container image from your `Dockerfile`, you use the command `docker build -t <name-your-image>:<tag> .`.
		* To build my container, I used `docker build -t hatorders:latest .` (not using specific versioning at this point in the project).
		* I used `docker images` to confirm my image was successfully built and available on my system.  

	- How to run the container.
		* To run the container, use the command `docker run -d --name <container-name> -p <port>:<port> <image-name:tag>`.
			- Replace `<container-name>` with a useful container name of your choice.
			- Replace `<image-name:tag>` with the specific image and version (tag) you want to use to run the container.
			- Concerning `<port>:<port>`, as an example, your container is serving content on host port `111:`, while your container binds to the host port on `:222`. Now making the `-p <port>:<port>` portion of the command `111:222`. In other words, `container is serving content on host port 111:container binds to host on port 222`.
			- To run my container locally on my system, I used `docker run -d --name hatwebsite -p 80:80 hatorders:latest`.
			- Then I used `docker ps` to view currently running containers.
			- You can also use `docker ps -a` to view active and exited containers on your system.  

	- How to view the project running in the container (open a browser...go to IP and port...).
		* Once the website content is up and running in the container, you have a few options to resort to that will help verify your website content is accessible.
			- You can use `curl localhost` and if your website content is up and running, you should see the html file content for your website listed in the terminal.
			- The next route I took was entering the IP address and port number in the browser to verify the website is accessible. In my case, I am completing this project using my AWS EC2 instance, so my instance's EIP is `54.159.137.125` at port `80`. So I entered `54.159.137.125:80` in the browser address bar to view the contents of my website.
			- Additionally, I entered `54.159.137.125:80` in different browsers on different devices to further confirm my website content was being served successfully. 

Part 2 -> GitHub Actions and DockerHub  
* Process to create public repo in DockerHub.
	- First of all, I had to create a DockerHub account on https://hub.docker.com/.
	- After logging in to the new DockerHub account, I clicked on the `Repositories` tab at the top of the webpage. Of course, there are no repositories currently listed in the new account.
	- Then I clicked the `Create Repository` button in the upper right corner of the webpage.
	- I am using namespace `aschlotterbeck` and I named my new public repository `ceg3120`.
	- I gave my new public repository a short description to identify it's purpose.
	- I left the `Visibility` labeled `Public` and then clicked the `Create` button.  

* How to authenticate with DockerHub via CLI using DockerHub credentials.  
	- I had to setup an `Access Token` for authentication purposes. To do this, from the home page on https://hub.docker.com/, I went to `home > my account > security` to find my access tokens.
	- I generated a new access token for my account and named it `ceg3120accesstoken`.
	- Since we can only view this access token once, I also copied and pasted the access token to a file on my local device for future use.
	- Now, using my personal access token instead of a password, I can authenticate and log in to my DockerHub account from the CLI.
	- To log in to my DockerHub account, I use `docker login -u aschlotterbeck` via CLI.
	- Next, I'm prompted for a password, this is where the access token can be entered via CLI to authenticate and log in to my DockerHub account.
	- What credentials would you recommend providing?
		* I recommend using the access token instead of the password as access tokens are often more secure.  

* How to push container image to DockerHub (without GitHub Actions).
	- To push my container image to DockerHub, I had to first change the name of my container image. I did this by using `docker tag hatorders:latest aschlotterbeck/ceg3120:latest`.
	- I used `docker images` to confirm I now have a repository/image named `aschlotterbeck/ceg3120:latest`.
	- To push the container image to DockerHub, I used `docker push aschlotterbeck/ceg3120:latest`.
	- I refreshed my DockerHub repository page to confirm that the container image successfully pushed to my DockerHub account.  

* __Link__ to your DockerHub repository.  
	- https://hub.docker.com/r/aschlotterbeck/ceg3120/tags  

* Configuring GitHub Secrets  
	- How to set a secret.
		* Starting from my `https://github.com/WSU-kduncan/s24cicd-aschlotterbeck` repository in GitHub, I can click on the `Settings` tab to open the settings configuration options for this specific repository.
		* From here, I can click on `Secrets and variables` located under the `Security` heading in the left column of the webpage.
		* From the drop down options, I selected `Actions` to access `Actions secrets and variables` and then selected `New repository secret`.
		* I entered `DOCKERHUB_USERNAME` in the `Name *` field and then added my DockerHub username in the `Secret *` field. Then clicked on `Add secret` to save the information entered.
		* Then I entered another `New repository secret` and entered `DOCKERHUB_TOKEN` in the `Name *` field and then added my DockerHub access token in the `Secret *` field. Then again, clicked on `Add secret` to save the information entered.  

	- What secret(s) are set for this project?		
		* For this project, my secrets are my `username` and `access token` required to login to my DockerHub account.
		* Both secrets are required in the GitHub actions yml file to provide authentication for login to my DockerHub account prior to the automated build and push of the Docker image.  

* Behavior of GitHub workflow  
	- What does it do and when?
		* My GitHub workflow is triggered whenever there is a push to the main branch of my GitHub repository. My GitHub Actions file builds a Docker image from the included codebase and pushes it to my DockerHub account under the specified tag included in the GitHub Actions file.  

			- Trigger: this establishes that the workflow is triggered when there is a push to the main branch of my GitHub repository.
			```
			on:
			  push:
			    branches:
			      - 'main'
			```
			- Jobs: There is one job included in this workflow referenced by `docker`. This will run on the `ubuntu-latest` environment.
			```
			jobs:
			  docker:
			    runs-on: ubuntu-latest
			```
			- Steps:
				* Set up QEMU
				* Set up Docker Buildx
				* Login to DockerHub
				* Build and push
			```
			    steps:
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
    		        name: Build and push
    		        uses: docker/build-push-action@v5
   			        with:
      		          push: true
      		          tags: aschlotterbeck/ceg3120:latest
			```
	- What variables in workflow are custom to your project?  

		* The variables in my workflow that are custom to my project:
			- `username`
			- `password`
			- `tags`  

Part 3 -> Diagramming  
* Include a diagram (or diagrams) of the continuous integration process. A good diagram will label tools used and how things connect. This diagram would probably look best near your project description.

- [Optimus Prime](#Optimus-Prime)

References:
* ChatGPT
* https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/How-to-dockerize-Apache-httpd-web-servers
* https://www.youtube.com/watch?v=I66s-6NzkL0
