/* this tells Next.js that this file must run on the client side.
it's required for using hooks like 'useState' to manage state,
such as showing or hiding the contact form modal. */
"use client"

// importing 'useState' hook from React to manage component state
import { useState } from "react"

// importing reusable UI components and icons for a consistent look and feel
import { CardDescription } from "@/components/ui/card"
import { Lightbulb, Clock, CheckCircle, Mail, Code, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ImageGallery } from "@/components/ui/image-gallery"
import { ContactForm } from "@/components/contact-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatePresence, motion } from "framer-motion"

// TypeScript interfaces define the "shape" or structure of my data.
// this helps me avoid errors by ensuring all project data is consistent.

// defines the structure for a downloadable document
interface ProjectDocument {
  title: string
  fileName: string
  description: string
}

// defines the structure for a single project object
interface Project {
  title: string
  description: string
  longDescription: string[]
  tags: string[]
  images?: Array<{ src: string; alt: string; caption: string }>
  documents?: ProjectDocument[]
  completed?: string
  teamSize?: string
  role: string
  keyFeatures: string[]
  status?: string
  imageUrl?: string
  sourceInfo?: string
}

// main projects page component
export default function ProjectsPage() {
  // state to control the visibility of the contact form modal
  const [showContactForm, setShowContactForm] = useState(false)

  // data for my currently active/in-progress projects
  const currentProjects: Project[] = [
    {
      title: "BlackJack Pro - Mobile App",
      description:
        "A premium mobile blackjack game developed for iOS and Android platforms. Features realistic gameplay, player statistics, achievements, and in-app purchases. Currently in final development stages with planned release to app stores.",
      tags: ["React Native", "Expo", "JavaScript", "TypeScript", "Mobile Development", "Game Development"],
      images: [
        {
          src: "/images/blackjack-gameplay.png",
          alt: "BlackJack Pro Gameplay",
          caption: "Active gameplay showing dealer's card and player's hand with decision options",
        },
        {
          src: "/images/blackjack-profile.png",
          alt: "BlackJack Pro Player Profile",
          caption: "Detailed player statistics and achievement tracking system",
        },
        {
          src: "/images/blackjack-shop.png",
          alt: "BlackJack Pro In-App Store",
          caption: "In-app purchase options for different chip packages",
        },
      ],
      status: "In Development",
      role: "Lead Developer",
      keyFeatures: [
        "Realistic card gameplay mechanics",
        "Player statistics and performance tracking",
        "Achievement system with unlockable badges",
        "In-app purchases for virtual currency",
        "Clean, intuitive user interface",
        "Cross-platform compatibility",
      ],
      longDescription: [
        "Designed and developed a premium blackjack mobile game targeting both iOS and Android markets",
        "Implemented realistic card game mechanics with accurate blackjack rules and betting systems",
        "Created comprehensive player statistics tracking to monitor performance and gameplay history",
        "Developed an achievement system to increase player engagement and retention",
        "Integrated in-app purchase functionality for monetization through virtual currency sales",
        "Designed a clean, intuitive user interface with smooth animations and responsive controls",
      ],
      sourceInfo: "Proprietary",
    },
  ]

  // data for my previously completed projects
  const pastProjects: Project[] = [
    {
      title: "University Crime - Data Analysis",
      description:
        "A data analysis project involving the design of a relational database, creation of an ETL pipeline, and development of Power BI dashboards to visualize FBI-reported crime data from over 800 universities.",
      longDescription: [
        "Designed and implemented a relational database in SQL Server to store and analyze FBI-reported crime data across 800+ universities from 2017 to 2019.",
        "Built a complete ETL pipeline to extract raw data from CSVs, clean and transform inconsistent values, and load into a normalized schema.",
        "Created Entity Relationship Diagrams (ERDs) to support schema design and enforce referential integrity between state, university, and crime statistics tables.",
        "Applied data cleansing techniques using SQL scripting and logic to resolve nulls and formatting errors from source files.",
        "Developed interactive Power BI dashboards to visualize trends by crime type, location, and year, enabling data-driven decision-making and insights generation.",
      ],
      tags: ["SQL Server", "Power BI", "ETL", "Data Modeling", "Data Cleansing", "Dashboarding"],
      images: [
        {
          src: "/images/fbi-database-erd-clean.png",
          alt: "Conceptual ERD for FBI Crime Data",
          caption:
            "Initial conceptual Entity Relationship Diagram outlining the basic table structures and relationships.",
        },
        {
          src: "/images/fbi-database-erd.png",
          alt: "Final SQL Server Database Diagram",
          caption:
            "The final database diagram as implemented in SQL Server, showing refined table schemas and enforced relationships.",
        },
        {
          src: "/images/fbi-dashboard-trends-by-school.png",
          alt: "Power BI Dashboard - Crime Trends by School",
          caption:
            "Line charts showing violent and property crime trends for a selected university (James Madison University) from 2017-2019.",
        },
        {
          src: "/images/fbi-dashboard-crime-by-state.png",
          alt: "Power BI Dashboard - Crime per Capita by State",
          caption: "Bar charts comparing violent and property crimes per capita across different states and years.",
        },
        {
          src: "/images/fbi-dashboard-violent-crime-breakdown.png",
          alt: "Power BI Dashboard - Violent Crime Breakdown",
          caption:
            "Pie chart illustrating the proportion of different violent crimes (Murder, Rape, Robbery, Aggravated Assault).",
        },
        {
          src: "/images/fbi-dashboard-property-crime-breakdown.png",
          alt: "Power BI Dashboard - Property Crime Breakdown",
          caption:
            "Pie chart illustrating the proportion of different property crimes (Burglary, Larceny, Motor Theft, Arson).",
        },
      ],
      documents: [
        {
          title: "ETL & Data Cleansing SQL Script",
          fileName: "fbi-crime-data-etl.sql",
          description:
            "The complete SQL script for the ETL process, including raw data ingestion, data cleansing with cursors, and populating the final normalized database.",
        },
      ],
      completed: "May 2025",
      teamSize: "3 developers",
      role: "Data Engineer & Analyst",
      keyFeatures: [
        "Relational Database Design",
        "Full ETL Pipeline Implementation",
        "Advanced Data Cleansing & Normalization",
        "Interactive Power BI Dashboards",
        "Entity Relationship Diagram (ERD) Modeling",
        "SQL Scripting for Data Transformation",
      ],
    },
    {
      title: "Musical Journeys - Scheduling and Management Platform",
      description:
        "A comprehensive music lesson scheduling and management platform built for a local music school. Features multi-role authentication, calendar integration, payment tracking, and lesson management for students, instructors, and business owners.",
      longDescription: [
        "Developed a full-stack web application to streamline music lesson scheduling and business operations",
        "Designed and implemented a normalized relational database with 8 interconnected entities supporting multi-role user management",
        "Built interactive calendar system for lesson scheduling and availability management",
        "Created comprehensive payment tracking and lesson notes system with proper foreign key relationships",
        "Implemented role-based authentication system supporting parents, students, renters, and business owners through a centralized credential system",
        "Integrated room rental functionality with pricing calculations and duration tracking",
        "Designed responsive UI with consistent branding and user-friendly forms",
      ],
      tags: ["ASP.NET Core", "C#", "SQL Server", "HTML", "CSS", "JavaScript"],
      images: [
        {
          src: "/images/musical-journeys-homepage.png",
          alt: "Musical Journeys Homepage",
          caption: "Welcome page with branding and navigation",
        },
        {
          src: "/images/musical-journeys-login.png",
          alt: "Login System",
          caption: "Secure authentication system with custom password hashing for enhanced backend security",
        },
        {
          src: "/images/musical-journeys-lesson-signup.png",
          alt: "Lesson Sign-up Form",
          caption: "Comprehensive lesson booking system",
        },
        {
          src: "/images/musical-journeys-calendar.png",
          alt: "Student Calendar",
          caption: "Interactive calendar for lesson scheduling",
        },
        {
          src: "/images/musical-journeys-erd.png",
          alt: "Database Entity Relationship Diagram",
          caption:
            "Comprehensive ERD showing the normalized database structure with 8 entities supporting multi-role authentication and business operations",
        },
        {
          src: "/images/musical-journeys-owner.png",
          alt: "Owner Dashboard",
          caption: "Business owner management tools",
        },
      ],
      completed: "December 2024",
      teamSize: "5 developers",
      role: "Full-Stack Developer",
      keyFeatures: [
        "Multi-role user authentication",
        "Interactive calendar scheduling",
        "Payment processing & tracking",
        "Lesson notes management",
        "Room rental system",
        "Responsive design",
      ],
    },
    {
      title: "Portfolio Website - Documentation",
      description:
        "This portfolio website, built with Next.js, Tailwind CSS, and Framer Motion. It includes comprehensive technical documentation detailing its architecture, components, and development process.",
      longDescription: [
        "Architected and developed this personal portfolio website to showcase projects, skills, and professional experience.",
        "Leveraged Next.js (App Router) for optimized routing, server components, and fast performance.",
        "Styled using Tailwind CSS for a utility-first, responsive design system.",
        "Incorporated Framer Motion for subtle and engaging animations and page transitions.",
        "Authored detailed technical documentation covering project structure, key technologies, component-level breakdowns, styling, animations, and deployment.",
        "Implemented features like a dynamic navigation bar, and an interactive contact form.",
        "Ensured a modular and scalable codebase with reusable components and utility functions.",
      ],
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Lucide Icons",
        "Vercel",
        "Technical Writing",
      ],
      role: "Full-Stack Developer",
      completed: "June 2025",
      teamSize: "1 Developer",
      keyFeatures: [
        "Responsive and Interactive UI/UX",
        "Server-Side Rendering with Next.js",
        "Utility-First Styling with Tailwind CSS",
        "Smooth Animations via Framer Motion",
        "Comprehensive Master Documentation",
        "Guide for Adding New Pages/Animations",
      ],
      documents: [
        {
          title: "Portfolio Website Master Documentation",
          fileName: "portfolio_master_documentation.pdf",
          description:
            "Complete reference guide including project structure, technologies, file breakdown, and component overview.",
        },
        {
          title: "Guide to Adding New Pages and Animations",
          fileName: "portfolio_add_pages_guide.pdf",
          description: "Step-by-step instructions for extending the website with new content and animations.",
        },
      ],
    },
  ]

  // this function renders the detailed content for each project.
  // I made this a separate function to keep the main return statement cleaner
  // and to reuse this layout for both past and current projects.
  const renderProjectAccordionContent = (project: Project) => (
    <div className="space-y-8 pt-4">
      <CardDescription className="text-gray-300 text-base leading-relaxed">{project.description}</CardDescription>
      {/* conditionally render image gallery only if images exist */}
      {project.images && project.images.length > 0 && (
        <>
          <h4 className="text-lg font-medium text-white mb-4">Project Gallery</h4>
          <ImageGallery images={project.images} />
        </>
      )}
      {/* conditionally render documents section only if documents exist */}
      {project.documents && project.documents.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-white mb-4">Downloadable Documents</h4>
          <div className="space-y-4">
            {project.documents.map((doc, docIndex) => (
              <a
                key={docIndex}
                href={`/documents/${doc.fileName}`}
                download={doc.fileName}
                className="flex items-start p-4 bg-black border border-gray-700 rounded-lg hover:border-emerald-400 transition-all duration-300 group"
              >
                <Download className="w-6 h-6 mr-4 text-emerald-400 group-hover:text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium group-hover:text-emerald-300">{doc.title}</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300">{doc.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <div>
        <h4 className="text-lg font-medium text-white mb-3">Key Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {project.keyFeatures.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center space-x-2 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium text-white mb-3">Technical Implementation</h4>
        <ul className="space-y-2 text-gray-300">
          {project.longDescription.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start space-x-3">
              <span className="text-gray-500 text-sm leading-none mt-1">•</span>
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-medium text-white mb-3">Technologies Used</h4>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-black border border-gray-700 text-gray-200 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      {/* special notices for specific projects */}
      {project.title === "Musical Journeys - Scheduling and Management Platform" && (
        <div className="bg-black p-4 rounded-lg border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300 mt-6">
          <h4 className="text-lg font-medium text-white mb-2 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-emerald-400" />
            Source Code Access
          </h4>
          <p className="text-gray-300 text-sm">
            Interested in reviewing the source code for this project? Please email me at{" "}
            <button
              onClick={() => setShowContactForm(true)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors underline cursor-pointer"
            >
              josiahxaya@gmail.com
            </button>{" "}
            with your request, and I'd be happy to share it for educational or review purposes.
          </p>
        </div>
      )}
      {project.title === "Portfolio Website - Documentation" && (
        <div className="bg-black p-4 rounded-lg border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300 mt-6">
          <h4 className="text-lg font-medium text-white mb-2 flex items-center">
            <Code className="w-5 h-5 mr-2 text-emerald-400" />
            Source Code Access
          </h4>
          <p className="text-gray-300 text-sm">
            The source code for this portfolio is well-annotated and available on my{" "}
            <a
              href="https://github.com/josiahxayavong/portfolio-website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      )}
      {project.title === "BlackJack Pro - Mobile App" && (
        <div className="bg-black p-4 rounded-lg border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300">
          <h4 className="text-lg font-medium text-white mb-2">Commercial Project Notice</h4>
          <p className="text-gray-300 text-sm">
            This is a commercial project currently in development for release on iOS App Store and Android Play Store.
            Source code is proprietary and not publicly available as this application is intended for monetization
            through in-app purchases.
          </p>
        </div>
      )}
    </div>
  )

  // the main return statement renders the page structure
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-12">
      {/* HERO SECTION: intro with project overview */}
      <section id="projects-hero" className="text-center pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Projects</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          A collection of personal, academic, and freelance projects I've worked on. Each project reflects my passion
          for technology and problem-solving.
        </p>
      </section>

      {/* PAST PROJECTS SECTION: uses Accordion for expandable project details */}
      <section id="past-projects">
        <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
          <CheckCircle className="w-8 h-8 mr-3 text-emerald-400" />
          Past Projects
        </h2>
        {pastProjects.length > 0 ? (
          <Accordion type="multiple" className="w-full space-y-6">
            {pastProjects.map((project, index) => (
              <AccordionItem
                value={`past-item-${index}`}
                key={`past-${index}`}
                className="bg-black border-2 border-gray-700 rounded-lg hover:border-emerald-400 transition-colors duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-xl hover:no-underline">
                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left">
                    <span className="text-white font-semibold">{project.title}</span>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0 flex-shrink-0">
                      {project.completed && (
                        <Badge variant="outlineSuccess" className="text-xs">
                          Completed: {project.completed}
                        </Badge>
                      )}
                      {project.role && (
                        <Badge variant="outlineInfo" className="text-xs hidden sm:inline-flex">
                          Role: {project.role}
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 border-t border-gray-700/50">
                  {renderProjectAccordionContent(project)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">No Past Projects</h2>
            <p className="text-gray-400">I'm working on my first projects. Check back soon!</p>
          </div>
        )}
      </section>

      {/* CURRENT PROJECTS SECTION: also uses Accordion for consistency */}
      <section id="current-projects">
        <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
          <Clock className="w-8 h-8 mr-3 text-emerald-400" />
          Current Projects
        </h2>
        {currentProjects.length > 0 ? (
          <Accordion type="multiple" className="w-full space-y-6">
            {currentProjects.map((project, index) => (
              <AccordionItem
                value={`current-item-${index}`}
                key={`current-${index}`}
                className="bg-black border-2 border-gray-700 rounded-lg hover:border-emerald-400 transition-colors duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-xl hover:no-underline">
                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left">
                    <span className="text-white font-semibold">{project.title}</span>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0 flex-shrink-0">
                      {project.status && (
                        <Badge variant="outlineWarning" className="text-xs">
                          {project.status}
                        </Badge>
                      )}
                      {project.sourceInfo && (
                        <Badge variant="outlineSecondary" className="text-xs hidden sm:inline-flex">
                          Source: {project.sourceInfo}
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 border-t border-gray-700/50">
                  {renderProjectAccordionContent(project)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">No Current Projects</h2>
            <p className="text-gray-400">I'm currently planning my next project. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Contact Form Modal: this is hidden by default and shown when 'showContactForm' is true */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
              className="w-full max-w-md"
            >
              <ContactForm onClose={() => setShowContactForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
