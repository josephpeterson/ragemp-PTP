# Installation
This process will install rage-mp, all required dependencies, aswell as the latest build of PTP.
```
#Prerequisite
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install libstdc++6

# Downloading RageMP server
wget https://cdn.rage.mp/lin/ragemp-srv-036.tar.gz

# Extract the server files
tar -xzf ragemp-srv-036.tar.gz
rm ragemp-srv-036.tar.gz

# Set executable permission
chmod +x ./ragemp-srv/server

# Download latest ptp build
rm -rf ragemp-PTP
git clone https://github.com/DigitalLifeGames/ragemp-PTP.git

#Copy files over into ptp main folder
mkdir -p ragemp-srv/packages/ptp
mkdir -p ragemp-srv/client_packages
cp -a ./ragemp-PTP/packages/. ragemp-srv/packages
cp -a ./ragemp-PTP/client_packages/. ragemp-srv/client_packages
cp -a ./ragemp-PTP/package.json ./ragemp-srv/packages/ptp
cp -a ./ragemp-PTP/package-lock.json ./ragemp-srv/packages/ptp
cd ragemp-srv/packages/ptp
npm install

# Run the server
cd ../../
./server
```

# Run the server
This will run an instance of the rage-mp server.
```
./server
```
# Only update to latest version of PTP
This code will update to the latest version of ptp without reinstalling RageMP.
```
# Download latest ptp build
rm -rf ragemp-PTP
git clone https://github.com/DigitalLifeGames/ragemp-PTP.git

#Copy files over into ptp main folder
mkdir -p ragemp-srv/packages/ptp
mkdir -p ragemp-srv/client_packages
rm -r ragemp-srv/client_packages/ptp
rm -r ragemp-srv/packages/ptp
cp -a ./ragemp-PTP/packages/. ragemp-srv/packages
cp -a ./ragemp-PTP/client_packages/. ragemp-srv/client_packages
cp -a ./ragemp-PTP/package.json ./ragemp-srv/packages/ptp
cp -a ./ragemp-PTP/package-lock.json ./ragemp-srv/packages/ptp
cd ragemp-srv/packages/ptp
npm install
```

# Development
First do npm install to set up development evironment. This install must be ran in the root github directory.
```
npm install
```

All tests should be ran and pass before build rollouts or any code moves. You may also run a mock version of the server. Database integrity tests will be ran if db_config.json is found within the root packages folder.
```
npm test
npm run mock-server
```
