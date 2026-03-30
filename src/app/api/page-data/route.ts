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
        { name: "Jenkins", type: "CI/CD" },
        { name: "Perforce", type: "version control" },
        { name: "Git", type: "version control" },
    ],
    mobile: [
        { name: "Kotlin", type: "language" },
        { name: "Swift", type: "language" },
        { name: "Java", type: "language" },
        { name: "SQL", type: "language" },
        { name: "Python", type: "language" },
        { name: "Ruby", type: "language" },
        { name: "SwiftUI", type: "frameworks" },
        { name: "UIKit", type: "frameworks" },
        { name: "Jetpack Compose", type: "frameworks" },
        { name: "Jenkins", type: "CI/CD" },
        { name: "Fastlane", type: "CI/CD" },
        { name: "Optimizely", type: "CI/CD" },
        { name: "Splunk", type: "monitoring" },
        { name: "NewRelic", type: "monitoring" },
        { name: "Amazon EC2", type: "cloud" },
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
        { name: "Splunk", type: "monitoring" },
        { name: "NewRelic", type: "monitoring" },
        { name: "Amazon EC2", type: "cloud" },
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
        icon: "/images/icon/tailwind-icon.svg",
        role: "Full Stack Mobile Engineer, Capital One",
        location: "Toronto",
        startYear: "2025",
        endYear: "Present",
        bulletPoints: [
            "Worked in Swift for iOS development",
            "Worked in Kotlin for Android development",
        ]
    }
]

const educationData = [
    {
        date: "Sep 2020 - May 2025",
        title: "Bachelor of Computer Science",
        subtitle: "University of Waterloo"
    }
];


const projectOverview = {
    caseStudies: [
        { name: "test", url: "#" },
    ],
    sideProjects: [
        { name: "Turtle Game", url: "#" }
    ]
};


export const GET = async () => {
    return NextResponse.json({
        skillsData,
        experienceData,
        educationData,
        projectOverview
    });
};