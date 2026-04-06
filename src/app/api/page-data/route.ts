import { NextResponse } from "next/server";

const skillsData = {
    game: [
        { name: "C++", type: "language" },
        { name: "C#", type: "language" },
        { name: "GDScript", type: "language" },
        { name: "Python", type: "language" },
        { name: "Ruby", type: "language" },
        { name: "Unreal Engine", type: "engine" },
        { name: "Unity", type: "engine" },
        { name: "Godot", type: "engine" },
        { name: "Houdini", type: "tool" },
        { name: "Blender", type: "tool" },
        { name: "Jenkins", type: "CI/CD and VC" },
        { name: "Perforce", type: "CI/CD and VC" },
        { name: "Git", type: "CI/CD and VC" },
    ],
    mobile: [
        { name: "Kotlin", type: "language" },
        { name: "Swift", type: "language" },
        { name: "SQL", type: "language" },
        { name: "Ruby", type: "language" },
        { name: "SwiftUI", type: "frameworks" },
        { name: "UIKit", type: "frameworks" },
        { name: "Jetpack Compose", type: "frameworks" },
        { name: "Jenkins", type: "CI/CD" },
        { name: "Fastlane", type: "CI/CD" },
        { name: "Amazon EC2", type: "monitoring and cloud" },
        { name: "Splunk", type: "monitoring and cloud" },
        { name: "NewRelic", type: "monitoring and cloud" },
    ],
    web: [
        { name: "TypeScript", type: "language" },
        { name: "Javascript", type: "language" },
        { name: "HTML/CSS", type: "language" },
        { name: "Python", type: "language" },
        { name: "Ruby", type: "language" },
        { name: "React.js", type: "frameworks" },
        { name: "Next.js", type: "frameworks" },
        { name: "Node.js", type: "frameworks" },
        { name: "Jenkins", type: "CI/CD" },
        { name: "Optimizely", type: "CI/CD" },
        { name: "Amazon EC2", type: "monitoring and cloud" },
        { name: "Splunk", type: "monitoring and cloud" },
        { name: "NewRelic", type: "monitoring and cloud" },
    ],
    ml: [
        { name: "Python", type: "language" },
        { name: "SQL", type: "language" },
        { name: "Pandas", type: "frameworks" },
        { name: "NumPy", type: "frameworks" },
        { name: "NLTK", type: "frameworks" },
        { name: "Selenium", type: "frameworks" },
    ]
};


const experienceData = [
    {
        logo: "/images/experience/capital-one-logo.svg",
        role: "Full Stack Mobile Engineer",
        location: "Capital One, Toronto",
        date: "June 2025 - Present",
        internship: "+ September 2024 - December 2024 (Internship)",
        bulletPoints: [
            ["Core Mobile Features & Platform Architecture",
                ["Implemented **end-to-end frontend and network architecture** for major user flow modernizations, including multi-account linking and profile refreshes. Engineered backwards-compatible **REST API layers** in Kotlin, handling analytics, legacy constraints, and regression edge cases.",
                "Resolved a critical API defect utilizing **Splunk logs** to trace cross-service payload drops, **preventing major production failures prior to launch.**",
                "Diagnosed a vendor-side library defect causing excessive CPU usage, **authoring a technical analysis paper utilized directly by the company** to patch the vulnerability globally.",
                "Investigated and resolved a critical **iOS platform** stability issue **affecting over 10,000 active users**. Utilized New Relic analytics to trace stack crashes including method swizzling to a legacy Swift CoreData race condition, **reducing the enterprise crash rate by 0.6%**.",
                "Executed proactive technical debt reduction across the iOS and Android codebase, refactoring legacy Singleton anti-patterns in Kotlin, expanding cross-platform support, and creating the enterprise migration proposal for Swift 6."
                ]
            ],
            ["CI/CD & Developer Experience",
                ["Led a major **enterprise initiative** to eliminate manual regression testing, supporting the shift to a weekly release cycle. **Eliminated 85+ legacy UI tests** on a strict deadline by managing the technical coordination and established the architectural criteria across 9 distinct feature teams.",
                "Developed and delivered a comprehensive 40+ slide technical training program for the new Weekly Release model to **35+ engineers**, detailing the new architecture and operational shifts for manual sign-offs.",
                "Created an **Android crash dashboard** in New Relic to monitor and track application stability metrics, managed by feature and fragment lifecycle, **with a 100% developer adoption rate**.",
                "Managed progressive phased rollouts to production with **feature flags**. Conducted live telemetry monitoring and weekly regression sign-offs for critical compliance and signup flows.",
                "Overhauled the mobile engineering onboarding architecture, identifying and correcting critical gaps in local environment setups, Fastlane replication, and access provisioning. Quickly authored disaster-recovery documentation for Artifactory authentication failures, unblocking the whole team.",
                ]
            ],
            ["Quality Assurance & Accessibility (a11y) Architecture",
                ["Served as the **primary technical lead** for a pilot enterprise accessibility review framework, **resolving 15+ compliance issues on the team alone**. Authored the standardized resolution documentation and directly mentored cross-functional developers on patching complex compliance failures.",
                "Engineered an automated script (Python) to scrape, consolidate, and format hundreds of enterprise-wide UI/UX issues into a centralized, queryable database.",
                ]
            ],
        ],
    },
    {
        logo: "/images/experience/haven-logo.jpeg",
        role: "Tools Engineer",
        location: "Haven Studios (Playstation Studio), Montreal",
        date: "May 2024 - August 2024",
        internship: "Internship",
        bulletPoints: [
            ["Core Pipeline & Automation",
                ["Architected a data-driven Multipart Export node **(Blender Python API, Unreal Blueprints) to bulk-export static meshes** with linked metadata. Consolidated 3 separate workflows into a single automated pipeline, reducing artist **export setup time from 10 minutes to seconds.**",
                "**Engineered the studio's first automated LOD Generation UI.** Devised a hybrid workflow to package hand-authored and auto-generated skeletal/static LODs into single .uasset files, bypassing Unreal's default overwrite behaviors via custom metadata. Presented tool architecture to **studio leadership** during company-wide reviews.",
                "Transitioned hard-coded validation logic into Unreal Data Tables, empowering non-programmers to define folder-specific rules. Integration automatically resolved **80+ existing validation errors**.",
                ]
            ],
            ["Engine Engineering",
                ["Accelerated **procedural landscape** iterations on Houdini by overhauling weight and height map exports into a **batched C++ delivery system**. Eliminated remote Python API overhead, reducing map **export times by 66%.**",
                    "Optimized Houdini-to-Unreal procedural generation via custom C++ serialization commands. Bypassed intermediate JSON storage for native Engine ingestion, **reducing point-cloud spawn times by 10%** and significantly streamlining the user interface.",
                    "Modified Unreal Engine 5 source code to implement a custom \"Number of References\" column in the Content Browser, enabling technical artists to quickly identify and **purge 20+ orphaned assets.**"
                ],
            ],
            ["Crisis Management & Workflow Support",
                ["**Resolved a critical team-wide pipeline blocker** under a strict deadline. Diagnosed an undocumented Blender-Perforce interaction and rewrote Python logic for exclusive checkout edge cases, immediately unblocking 12 character artists.",
                "Troubleshot and resolved severe silent engine failures, isolating complex, undocumented import conflicts between **Unreal's Nanite system and traditional LOD groups.**",
                 "Mentored technical art teams on new pipeline tools and established cross-application debugging workflows spanning PyCharm, Houdini, Blender, and Unreal."
                ],
            ],
        ]
    },
    {
        logo: "/images/experience/stratumai-logo.jpg",
        role: "Machine Learning Engineer",
        location: "StratumAI, Remote",
        date: "September 2023 - December 2023",
        internship: "Internship",
        bulletPoints: [
            ["",
                [
                    "Optimized ML data preprocessing and visualization pipelines by resolving complex array masking logic.",
                    "Developed a reproducible research framework using Jupyter Notebooks and Sphinx, standardizing the visualization of high-dimensional datasets and model performance metrics for the broader engineering team.",
                    "Independently built a robust and highly customizable notification bot for when scripts completed, using the Slack API and Bolt in Object-Oriented Python, with a 100% developer adoption rate.",
                    "Led a data mining final project using k-means clustering and dimensionality reduction techniques for data visualization. Analyzed trends and their uses in a comprehensive report presented to my team.",
                ]
            ],
        ]
    },
    {
        logo: "/images/experience/ford-logo.jpg",
        role: "Full Stack Software Engineer",
        location: "Ford Motor Company, Remote",
        date: "May 2022 - August 2022",
        internship: "Internship",
        bulletPoints: [
            ["Feature Engineering",
                [
                    "Integrated a site-wide Elasticsearch engine, implementing custom suggesters and optimized results-page logic to enhance query relevance.",
                    "Developed and deployed **10+ high-visibility features** for the official Ford Pro web platform using a React and Java (Spring Boot) stack.",
                    "Engineered an interactive 'Locate a Dealer' service via the HereMaps API, utilizing real-time geolocation and multi-parameter filtering to connect users with specialized service centers.",
                ]
            ],
            ["Platform Engineering & DevOps",
                [
                    "Assisted the migration of enterprise CI/CD pipelines from Harness to Tekton, modernizing the deployment lifecycle for Ford Pro services.",
                    "Streamlined developer workflows by containerizing legacy services and ensuring high availability across automated staging environments.",
                    "Designed and implemented an automated billing task during a company-wide hackathon, utilizing a React/Java architecture to schedule and dispatch invoices."
                ],
            ],
        ]
    },
]

const educationData = [
    {
        date: "Sep 2020 - May 2025",
        title: "Bachelor of Computer Science",
        subtitle: "University of Waterloo"
    }
];


const projectOverview = {
    sideProjects: [
        { 
            name: "Wrath of Daedalus",
            image: "/images/projects/wrathofdaedalus.png",
            overlayImg: "/images/projects/icarus.png",
            buttonOne: ["Itch.io", "https://eternalon03.itch.io/wrath-of-daedalus"],
            buttonTwo: ["GitHub", "https://github.com/oman276/UWJamW25"],
            description: "A fast-paced action game where you play as steampunk Icarus, defeating an endless set of his father's mechanical creations while managing the heat! Attacking uses fire, and if he gets too hot his wings melt into the sea below him." ,
            bulletpoints: [
                "Polished camera system using lerping and easing for smooth, responsive movement",
                "2D pathfinding system, avoiding calculating every frame for CPU optimization",
                "Fully animated 2D skeleton system with custom animation controller",
                "Created for the University of Waterloo's Winter Game Development Club's game jam, while also helping to run the jam as an exec",
            ],

            skills: ["Godot", "GDScript"],
        },
        { 
            name: "CoinTrail: Gamified Deals and Expense Tracking",
            image: "/images/projects/cointrail.png",
            overlayImg: "/images/projects/cointrail_overlay.png",
            buttonOne: ["Video Demo", "https://youtu.be/dfk_-6fy-4o"],    
            buttonTwo: ["GitHub", "https://github.com/Eternalon03/Cointrail-Expense-Tracker"],
            description: "A full-stack financial platform using Kotlin/Jetpack Compose and FastAPI, integrating a global community deal-hunting module with a real-time voting system and an XP-based leveling system with a virtual pet that reacts dynamically to the user's financial goal progress" ,
            bulletpoints: [
                "High-scale application on a Kubernetes (K8S) cluster with Horizontal Pod Autoscaling, created with Kotlin/Jetpack Compose and Python FastAPI",
                "Event-Driven notification system utilizing Firebase Cloud Messaging, decoupling backend event triggers from the client",
                "Created with a 6-person team, documenting functional and non-functional requirements, and detailed system architecture",
            ],
            skills: ["Kotlin", "Jetpack Compose", "Python", "FastAPI", "PostgreSQL", "Kubernetes", "Docker", "GCP Firebase"],
        },
        { 
            name: "“Fish For Thought”: Hack the North 2025",
            image: "/images/projects/fishforthought.png",
            overlayImg: "/images/projects/fishforthought_overlay.png",
            buttonOne: ["Video Demo", "https://devpost.com/software/fish-for-thought"],    
            buttonTwo: ["GitHub", "https://github.com/Eternalon03/Hack-The-North-2025"],
            description: "Fish for Thought aims to help users reflect and log what they did and felt throughout their day on the app. People love custom experiences so, mildly inspired by the popularity of daily horoscopes, Fish For Thought gives users a custom breakdown of the emotions and things they did that day through a cute journaling interface. In this game you write down a journal entry, our AI analyzes the tone, and then you're awarded a special fish that represents that emotion.",
            bulletpoints: [
                "",
            ],
            skills: ["Python", "Godot", "GDScript", "Kubernetes", "Docker", "GCP Firebase"],
        }  
    ]
};


const certificationsData = [
    {
        name: "Certified AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2026",
        credentialId: "ID: AWS-CLF-C01",
        image: "/images/certifications/aws.jpeg"
    },
    {
        name: "Piano & Theory Music Certificate Level 8",
        issuer: "Royal Conservatory of Music",
        date: "",
        credentialId: "",
        image: "/images/certifications/ewk.png"
    },
    {
        name: "Senior Black Belt",
        issuer: "East West Karate",
        date: "",
        credentialId: "",
        image: "/images/certifications/rcm.jpg"
    }
];

export const GET = async () => {
    return NextResponse.json({
        skillsData,
        experienceData,
        educationData,
        projectOverview,
        certificationsData
    });
};