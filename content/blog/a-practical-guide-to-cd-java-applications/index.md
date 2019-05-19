---
title: A Practical guide to CD Java Applications
date: "2017-10-19T22:12:03.284Z"
---

At JAX London a few weeks ago I attended the talk of [@danielbryantuk](https://twitter.com/danielbryantuk) about Continuous Delivery With Containers, where he gave a few samples of his book [Containerizing Continuous Delivery in Java](https://www.nginx.com/resources/library/containerizing-continuous-delivery-java/) (get a free copy on the link).

The book it's easy to read, thin and straight to the point, in 53 pages the author gives a small review/context about the topic there discussed, and demonstrates conceptually and practically how to implement a flow of continuous delivery of a java application using Docker as container technology and Jenkins as tool for automation of the flow, the book is not about how to write Dockerfiles for this purpose the author recommends [Docker for Java Developers](http://www.oreilly.com/programming/free/docker-for-java-developers.csp) (Also available for free in the link) from Arun Gupta. The author flags the questions and important concepts that you should consider while implementing such a flow, he raises our awareness on common mistakes but this is just the tip of the iceberg, it's a nice starting point on the topic.

In the real world, your company might be using other tools for continuous integration (e.g.: CircleCI, Travis) and you might have to adapt the proposed flow to the resources that your tool give to you, also if your cluster runs inside a VPN you may have to handle the security implications of your CI/CD tool connecting in the VPN. I felt that the author stopped in the "staging/test" environment, I missed comments about a pipeline/barrier mechanism for the production environment.

Recommended read for who is considering to adopt this flow and don't have nothing similar implemented yet.

Kudos to the author for the useful [open source repository](https://github.com/danielbryantuk/oreilly-docker-java-shopping).
