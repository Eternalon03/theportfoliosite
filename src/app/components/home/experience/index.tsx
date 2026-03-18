"use client";
import Image from "next/image"
import { useEffect, useState } from "react";

const Experience = () => {
    const [experienceData, setExperienceData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setExperienceData(data?.experienceData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10">
                </div>
            </div>
        </section>

    )
}

export default Experience