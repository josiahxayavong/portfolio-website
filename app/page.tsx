/* this tells Next.js that this file must run on the client side.
it's required because we use browser-specific features like useState, useRef,
event handlers (e.g., onClick, onMouseMove), and navigator.clipboard.
without "use client", Next.js would treat this file as a server component and throw errors. */
"use client"

// importing React types for TypeScript
import type React from "react"

// importing hooks used in this component
// useState = stores and updates values between renders
// useRef = references a DOM element directly (like a heading tag)
import { useState, useRef } from "react"
// importing icons for visual elements across the page
import { Mail, Phone, MapPin, Briefcase, Cpu, Palette, Award, Star, Server, Database, Code, Check, LinkedIn } from "lucide-react"
// importing reusable UI components for consistent layout and styling
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// main homepage component
export default function HomePage() {
  // tracks if email or phone was just copied
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  
  // tracks mouse position over the name element for hover effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  // reference to the <h1> element for measuring its position
  const nameRef = useRef<HTMLHeadingElement>(null)

  // updates mouse position when hovering over the name element
  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (nameRef.current) {
      const rect = nameRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsHovering(true)
    }
  }

  // disables hover effect when mouse leaves the name element
  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // copies provided text (email or phone) to clipboard
  // displays a checkmark for 2 seconds after copy
  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "email") {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else {
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  // skill categories for display in the Skills section
  const skills = {
    languages: [
      "Python",
      "SQL",
      "JavaScript",
      "TypeScript",
      "Java",
      "C#",
      "C++",
      "HTML/CSS",
    ],
    frameworks: ["React", "Node.js", "ASP.NET Core", "Git", "MongoDB", "MySQL", "NoSQL", "Apache Hadoop", "AWS (EC2, S3, IAM)", "REST APIs"],
    othertools: ["Power BI", "Microsoft 365", "Adobe Creative Cloud", "Visual Studio Code", "Jira", "Postman", "Figma"],
    methodologies: ["Agile/Scrum", "Waterfall", "CI/CD", "Object-Oriented Programming/Development (OOP)", "MVC Architecture"],
  }

  // list of certifications to show in the Certifications section
  const certifications = [
    {
      title: "AWS Academy – Cloud Computing",
      date: "May 2024",
      details:
        "Completed modules on EC2 provisioning, IAM roles, VPCs, and cost management through lab-based exercises.",
      icon: Server,
    },
    {
      title: "Carroll County Career and Technology Center – Graphic Design",
      date: "June 2019",
      details: "Produced branding projects using Adobe Illustrator and Photoshop, collaborating in small design teams.",
      icon: Palette,
    },
  ]

  // work history for display in the Experience section
  const experiences = [
    {
      company: "Musical Journeys",
      role: "Web Developer",
      dates: "Aug. 2024 – Dec. 2024",
      location: "Harrisonburg, VA",
      responsibilities: [
        "Engineered a full-stack web application for scheduling and managing music lessons, hosted on AWS.",
        "Participated in Agile/Scrum development with 5-person team; contributed to sprint planning, retrospectives, and Git-based version control.",
        "Designed and implemented user-friendly UI/UX based on client feedback; improved onboarding flow resulting in 40% shorter signup time.",
        "Coordinated with stakeholders to define functional requirements, prioritize features, and demo releases.",
      ],
    },
    {
      company: "Starship Technologies",
      role: "Robot Engineer",
      dates: "Feb. 2021 – May 2024",
      location: "Harrisonburg, VA",
      responsibilities: [
        "Administered a fleet of 60 autonomous delivery robots, performing preventative maintenance and diagnosing hardware/software malfunctions using Linux-based diagnostic tools.",
        "Streamlined robot recovery operations by developing SOPs and toolkits, reducing downtime by 25%.",
        "Led and trained over 15 new student employees, enhancing technical troubleshooting efficiency and cross-functional coordination.",
        "Conducted real-time field debugging, sensor calibration, and merchant integration checks to support last-mile delivery infrastructure.",
      ],
    },
  ]

  // everything below renders the homepage visually using the data above
  return (
    <div className="min-h-screen">
      {/* HERO SECTION: Includes profile picture, animated name heading, subtitle, and contact buttons */}
      {/* Contains clipboard copy interaction, hover effects, and a brief intro */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300 overflow-hidden">
            <img src="/images/profile-photo.jpg" alt="Josiah Xayavong" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mb-6">
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight cursor-default relative inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={nameRef}
            style={{
              background: `linear-gradient(to right, 
                ${isHovering ? "white" : "white"} 0%, 
                ${isHovering ? "white" : "white"} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: isHovering
                ? `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, #10b981 0%, #10b981 40%, white 70%, white 100%)`
                : "linear-gradient(to right, white 0%, white 100%)",
              transition: "background-image 0.1s ease-out",
              paddingBottom: "0.2em", // Add padding to ensure descenders are included
              marginBottom: "-0.2em", // Compensate for the padding
            }}
          >
            Josiah Xayavong
          </h1>
        </div>

        <div className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          <p className="mb-2">Computer Information Systems Professional</p>
          <p>Web Development and Database Enthusiast</p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-y-3 gap-x-6 text-gray-300">
          <a
            href="https://www.linkedin.com/in/josiah-xayavong"
            target="_blank" // This opens the link in a new tab
            rel="noopener noreferrer" // Security best practice for new tabs
            className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <LinkedIn className="w-5 h-5 mr-2" />
          </a>
          <button
            onClick={() => copyToClipboard("josiahxaya@gmail.com", "email")}
            className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {copiedEmail ? <Check className="w-5 h-5 mr-2 text-emerald-400" /> : <Mail className="w-5 h-5 mr-2" />}
            {copiedEmail ? "Copied!" : "josiahxaya@gmail.com"}
          </button>
          <button
            onClick={() => copyToClipboard("(410) 831-0467", "phone")}
            className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {copiedPhone ? <Check className="w-5 h-5 mr-2 text-emerald-400" /> : <Phone className="w-5 h-5 mr-2" />}
            {copiedPhone ? "Copied!" : "(410) 831-0467"}
          </button>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Finksburg, MD
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-16 md:space-y-20">
        {/* ABOUT SECTION: Card component showing a brief summary of background, education, and goals */}
        <section id="about">
          <Card className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Star className="w-6 h-6 mr-3 text-emerald-400" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed text-lg">
                A results-oriented Computer Information Systems graduate from James Madison University with a strong
                foundation in full-stack web development, systems analysis, database engineering, and cloud computing.
                Proven ability to manage complex technical projects, lead teams, and deliver innovative solutions. Eager
                to leverage diverse technical skills and a collaborative mindset to contribute to impactful projects in
                the tech industry.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* EXPERIENCE SECTION: Dynamically rendered list of past work experiences with roles and bullet points */}
        <section id="experience">
          <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
            <Briefcase className="w-8 h-8 mr-3 text-emerald-400" />
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white">{exp.role}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {exp.company} | {exp.location} | {exp.dates}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-outside pl-5 space-y-2 text-gray-300">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS SECTION: Grid layout showcasing earned certifications with dates and icons */}
        <section id="certifications">
          <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-emerald-400" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card
                key={cert.title}
                className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300"
              >
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <cert.icon className="w-7 h-7 text-emerald-400 mt-1" />
                    <div>
                      <CardTitle className="text-xl text-white">{cert.title}</CardTitle>
                      <CardDescription className="text-gray-500">{cert.date}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{cert.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION: Badges grouped into categories such as languages, frameworks, tools, and methodologies */}
        <section id="skills">
          <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
            <Cpu className="w-8 h-8 mr-3 text-emerald-400" />
            Technical Skills
          </h2>
          <Card className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300">
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-100 mb-3 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-emerald-400" /> Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-black border border-gray-700 text-gray-200 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors px-3 py-1 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100 mb-3 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-emerald-400" /> Frameworks & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-black border border-gray-700 text-gray-200 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors px-3 py-1 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100 mb-3 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-emerald-400" /> Other Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.othertools.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-black border border-gray-700 text-gray-200 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors px-3 py-1 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100 mb-3 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-emerald-400" /> Methodologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.methodologies.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-black border border-gray-700 text-gray-200 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors px-3 py-1 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* INTERESTS SECTION: Styled badges for hobbies and side interests related to personal and technical growth */}
        <section id="interests">
          <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-emerald-400" />
            Project Interests & Hobbies
          </h2>
          <Card className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {[
                  "Robotics",
                  "AI/ML Concepts",
                  "Web Application Architecture",
                  "Gymnastics",
                  "Soccer",
                  "Basketball",
                  "Lacrosse",
                  "Football",
                  "Hiking",
                  "Reading",
                  "Tech Meetups",
                ].map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="bg-black border border-gray-700 text-gray-200 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors px-3 py-1 text-sm"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
