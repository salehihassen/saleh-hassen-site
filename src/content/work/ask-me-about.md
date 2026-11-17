---
title: Ask me about these projects
publishDate: 2026-11-03 14:00:00
img: ../../resources/provisioning_servers.jpeg
img_alt: A rack of servers and network cables with a laptop resting on top of the servers.
description: "Ask me about other previous works of mine. If enough are interested I'll write up a full post."
tags:
  - Ask me about
---

<!-- TEMPLATE: Replace bracketed prompts with your own writing. The image,
date, and tags above are starting values. Duplicate or remove project sections
as needed; the headings come from the former placeholder entries. -->

Below is a few other things I've worked on in the past. Feel free to ask me about it.

## Maintaining backend microservices and a React web app for a critical gov.t workflow

At Insight Global, I joined a short term contract maintaining a legacy full stack app w/ a React frontend, Python & Java backend services, hosted on AWS GovCloud w/ Kubernetes and AWS Simple Workflow (Precursor to AWS Step functions). Team operated with sprint planning with Government stakeholders and Jira to manage tickets. I quickly onboarded onto the team and found ways to contribute and understand the codebase. At the time the project wasn't allowed to utilize AI systems. Debugging of services was done with Kibana logs. 

**What I worked with:**  
Java, Python, React, JavaScript, Protocol Buffers (Protobufs), GitLab, AWS, S3, SQS, SNS, Simple Workflow (SWF), CloudFormation, EC2, Docker, PowerShell, Windows Server. 

## Kernel driver & C library development for cryptography

At Two Six Technologies I worked on TrustedHSM. We took a R&D effort developing an FPGA backed HSM device and developed it into a production-ready product to clients of TrustedKeep. This product involved a lot of pieces from the FPGA, firmware, software, and hardware teams. I contributed to the userspace library, the kernel modules on the host and embedded device, end-to-end control plane operations including firmware updates, assisting with propagating fault detection events in the system due to tampering or etc, provisioning servers, and debugging issues. I appreciated my time on this fast-pace project working toward client delivery working alongside talented engineers.  

**What I worked with:**  
C, C++, Makefile, GitLab CI/CD, Kernel Modules, STM32 Microcontroller, Shell scripts, Yocto, Cryptography, Symmetric and Assymetric Key Encryption, Key Management, FPGA, sNVM, PCIe, ioctl, iDRAC, finite state machines, Bash, Linux.

## Testing software for a networking device prototype

<!-- Former preview: Developing test software to validate networking and
control plane behavior of a prototype.
Tags: DevOps, Testing & Verification, Embedded Systems. -->

At Two Six Technologies, I contributed toward an R&D program developing a networking device operating at the OSI Layer 1 through 3. The device acted as a bump in the wire and altered networking behavior of downstream devices via networking mode, Layer 2 data, and providing a configurable firewall. I developed the test software to validate behavior of the subcomponents and the overall device that was used for factory acceptance testing to mass produce the devices. I also contributed toward the microcontroller firmware to manage control plane signals. I worked alongside FPGA and hardware engineers to understand requirements and debug unexpected behavior. It was a great project to work on hardware and software co-design.

**What I worked with:**  
Python, Pytest, scapy, tcpdump, wireshark, GitLab CI/CD, C, Makefile, STM32 Microcontroller, Rust, embassy_stm32, Oscilloscope, Multimeter, Interrupts, Test Specification, Test Procedures, OSI network headers, RS232, wolfBoot, Designing a test harness, Bash, Linux. 


## Prototyping AI eval of search features

<!-- Former preview: Week long internal hackathon integrating Gemini for
Search evals. Tags: AI, Testing & Verification. -->

For a week-long hackathon, my team and I developed a prototype automating a subset of evals assessing if a search feature improved or harmed the search experience for a subset of queries. The current process at Google relied on human raters to evaluate the diffs in search results with a search feature enabled and disabled. For the checks that were at least somewhat objective we utilized Gemini (LLM-as-a-Judge), Retrieval-Augmented Generation (RAG), Knowledge Graph, and Spanner evaluating relevance, accuracy, and freshness of the search page diff. The project was largely incomplete but we learned a lot from the experience and contributed our findings to another team taking on the effort.

**What I worked with:**  
Python, Gemini, LLM-as-a-Judge, Retrieval Augmented Generation (RAG), Knowledge Graph, Spanner, Data ingestion, Search APIs.

## Search features at Google


At Google, as my first full-time SWE position, I developed search features for the Sustainability search vertical team. It was a great opportunity learning how to build at scale and navigating how a large institution balances stability and improvements.

**What I worked with:**  
C++, Java, Protocol Buffers (Protobufs), Spanner, Knowledge Graph, Superroot, Google Web Server (GWS), A/B experiments, JSLayout, HTML, CSS, TypeScript, Data Ingestion, Piper version control, Mercurial, Fig, google3, Wiz, Boq, Bash, Linux.


## Personal Network web app

<!-- Former preview: Using Codex, I implemented a Convex web app to track
my personal network and blocklist. Tags: Full-Stack. -->

Outside of work in 2025, I experimented with my first project with OpenAI Codex to implement my own personal rolodex to document the connections in my network and entities I wish to avoid. I now use the project as an alternative to LinkedIn to stay in touch with the people I appreciate. The project uses Convex for database, server functions, and authentication; React 18 w/ React Router for the frontend; and the node graph visual using react-force-graph-2d. Using placeholder data from staging environment for privacy reasons.  

<video controls playsinline preload="metadata" width="1280" height="800" aria-label="Personal Network web app demo" class="mx-auto block h-auto w-full max-w-2xl rounded-xl border border-rail">
  <source src="/videos/personal-network-demo.mp4" type="video/mp4" />
  <a href="/videos/personal-network-demo.mp4">Download the Personal Network demo video.</a>
</video>

**What I worked with:**  
OpenAI Codex CLI, React 18, TypeScript, Vite 8, React Router, Tailwind CSS, shadcn/ui, Radix, Lucide icons, Convex, server functions, real-time sync, authentication, Zustand, react-force-graph-2d, React Hook Form, Zod validation, pnpm, ESLint, Vitest, Storybook. 

## Interested in a project?

[Ask me on LinkedIn](https://www.linkedin.com/in/saleh-hassen/)
