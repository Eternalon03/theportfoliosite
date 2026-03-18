"use client";
import { useEffect, useState } from "react";

const Education = () => {
    const [educationData, setEducationData] = useState<any>(null);
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await fetch('/api/page-data')
                    if (!res.ok) throw new Error('Failed to fetch')
                    const data = await res.json()
                    setEducationData(data?.educationData)
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

export default Education