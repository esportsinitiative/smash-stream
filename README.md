# Smash Stream

ESI's Dynamic Smash Stream Content

<!-- TOC depthFrom:2 -->

- [Setup](#setup)
    - [Docker](#docker)

<!-- /TOC -->

## Setup
### Docker

1. Install [Docker](https://www.docker.com/) and [Git](https://git-scm.com/)
2. Clone the repositiony: `git clone https://github.com/esportsinitiative/smash-stream.git`
3. Build and run the `Dockerfile`:

```bash
docker build -t smash-stream .
# Replace `pwd` with $pwd` on Windows
docker run -it --rm -v `pwd`/bundles/:/usr/src/app/nodecg/bundles/ -p 9090:9090 smash-stream bash
node index.js
```

4. Navigate to: `localhost:9090/`
