Aaron Schlotterbeck  
Spring 2024  
CEG 3120: Project 04  

Part 1 -> Dockerize It  
* CI Project Overview  
	- (what are you doing, why, what tools?)  

* Run Project Locally  
	- How to install docker.
		* I am running Ubuntu 22.04.4 LTS on my device and had to use `sudo apt install docker.io` to install Docker.
		* After installation, I used `which docker` to locate the executable files.
		* I also used `docker --version` to identify current version that was installed, which was Docker version 24.0.5.
		* Lastly, I used `systemctl status docker` to confirm Docker was, in fact, installed and up and running on my system.
		* To use Docker commands without using sudo, I used `sudo usermod -aG docker ubuntu` to add my user to the Docker group.  
	- How to install dependencies (WSL2).
		* To install WSL2 on Windows 11, you can open Powershell in administrator mode and select "Run as Administrator", then enter the command `wsl --install`. This will install, setup, and enable the required features to run WSL, and by default, install the Ubuntu distribution of Linux.
		* You do have the option to change the default Linux distribution that is installed. This can be accomplished by using `wsl --install -d <distribution name>` and then replacing `<distribution name>` with your preferred distro.
		* To view the list of available Linux distributions available, enter the command `wsl -l -o`.
		* Additional Linux distributions can be installed following the initial installation by using the command `wsl --install -d <distribution name>`.
		* In Powershell, I used `wsl -v -l` to confirm that I am currently running WSL version 2.2.1.0.  

	- How to build a container image from the `Dockerfile`.
		*
	- How to run the container
	- How to view the project running in the container (open a browser...go to IP and port...)  

Part 2 -> GitHub Actions and DockerHub  
* Process to create public repo in DockerHub  
* How to authenticate with DockerHub via CLI using DockerHub credentials  
	- What credentials would you recommend providing?  
* How to push container image to DockerHub (without GitHub Actions)  
* __Link__ to your DockerHub repository  
* Configuring GitHub Secrets  
	- How to set a secret
	- What secret(s) are set for this project
		* Note: do not copy paste your secrets into your documentation  
* Behavior of GitHub workflow  
	- What does it do and when
	- What variables in workflow are custom to your project  
		* This may need to be changed if someone else is going to use it or you reuse it  

Part 3 -> Diagramming  
* Include a diagram (or diagrams) of the continuous integration process. A good diagram will label tools used and how things connect. This diagram would probably look best near your project description.

