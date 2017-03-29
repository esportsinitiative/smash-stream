# Smash Stream

ESI's Dynamic Smash Stream Content

<!-- TOC depthFrom:2 -->

- [Setup](#setup)
    - [1. Pre-Setup](#1-pre-setup)
    - [2. Docker](#2-docker)

<!-- /TOC -->

## Setup
### 1. Pre-Setup

Get the repository, dependencies and movies!

1. Install [Git](https://git-scm.com/)
2. Then clone the repositiony: `git clone https://github.com/esportsinitiative/smash-stream.git`
3. Place the movie `S4-loop.mp4` into the `graphics/img/` directory (downloaded from TBD)

### 2. Docker

4. Install [Docker](https://www.docker.com/)
5. Build and run the `Dockerfile`:

```bash
docker build -t smash-stream .
# Replace `pwd` with $pwd` on Windows
docker run -it --rm -v `pwd`:/usr/src/app/nodecg/bundles/smash-stream/ -p 9090:9090 smash-stream bash
nodecg start
```

6. Navigate to: `localhost:9090/`
