// tells Next.js this file should run on the client (needed for useState, animations, and events)
"use client"

// import useState for toggling the contact form
import { useState } from "react"

// import custom UI components and icons used in project cards
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Clock, CheckCircle, Mail, Code, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ImageGallery } from "@/components/ui/image-gallery"
import { ContactForm } from "@/components/contact-form"

// import animation utilities from Framer Motion for contact modal
import { AnimatePresence, motion } from "framer-motion"

// TypeScript interfaces define the "shape" or structure of objects.
// they help ensure data consistency and provide autocompletion and type-checking during development.

// `ProjectDocument` defines the structure for an individual downloadable document
// associated with a project. Each document will have a title, a specific file name
// (which is crucial for linking to the correct file in the /public/documents directory),
// and a brief description.
interface ProjectDocument {
  title: string
  fileName: string
  description: string
}

// `Project` defines the overall structure for a project object.
// it includes all the properties a project can have, such as its title,
// description (short and long), tags (technologies used), an optional array of images
// for the gallery, an optional array of `ProjectDocument` objects (for downloads),
// completion status, team size, role, key features, current status,
// and an optional image URL (e.g., for projects without a full gallery).
// making certain fields optional (e.g., `images`, `documents`, `completed`) allows for
// flexibility in defining different types of projects.
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

export default function ProjectsPage() {
  // controls visibility of the contact form modal
  const [showContactForm, setShowContactForm] = useState(false)

  // data for currently active/in-progress project(s)
  // explicitly type the array with the new Project interface
  const currentProjects: Project[] = [
    {
      title: "BlackJack Pro",
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

  // data for previously completed project(s)
  // explicitly type the array with the new Project interface
  const pastProjects: Project[] = [
    {
      title: "Musical Journeys",
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
      title: "Portfolio Website",
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

      {/* PAST PROJECTS Section */}
      <section id="past-projects">
        <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
          <CheckCircle className="w-8 h-8 mr-3 text-emerald-400" />
          Past Projects
        </h2>

        {pastProjects.length > 0 ? (
          <div className="space-y-12">
            {pastProjects.map((project, index) => (
              <Card
                key={index}
                className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">{project.title}</CardTitle>
                      {/* Made these conditional based on optional properties */}
                      {(project.completed || project.teamSize || project.role) && (
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          {project.completed && <span>Completed: {project.completed}</span>}
                          {project.teamSize && <span>Team Size: {project.teamSize}</span>}
                          {project.role && <span>Role: {project.role}</span>}
                        </div>
                      )}
                      <span className="text-xs bg-green-700/30 text-green-400 px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div>
                    {/* Conditionally render image gallery if images exist */}
                    {project.images && project.images.length > 0 && (
                      <>
                        <h4 className="text-lg font-medium text-white mb-4">Project Screenshots</h4>
                        <ImageGallery images={project.images} />
                      </>
                    )}

                    {/* --- ADDED JSX FOR DOCUMENT DOWNLOADS --- */}
                    {project.documents && project.documents.length > 0 && (
                      <div className="mt-6">
                        {" "}
                        {/* Added some margin-top for spacing */}
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
                    {/* --- END OF ADDED JSX FOR DOCUMENT DOWNLOADS --- */}
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.keyFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-gray-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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
                          <span className="text-gray-500 text-sm leading-none mt-0.5">•</span>
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

                  {project.title === "Musical Journeys" && (
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
                  {/* Updated title check to match your data */}
                  {project.title === "Portfolio Website" && (
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
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">No Past Projects</h2>
            <p className="text-gray-400">I'm working on my first projects. Check back soon!</p>
          </div>
        )}
      </section>

      <section id="current-projects">
        <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
          <Clock className="w-8 h-8 mr-3 text-emerald-400" />
          Current Projects
        </h2>

        {currentProjects.length > 0 ? (
          <div className="space-y-12">
            {currentProjects.map((project, index) => (
              <Card
                key={index}
                className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300"
              >
                {/* Adjusted conditional rendering for current projects based on your structure */}
                <CardHeader>
                  {project.imageUrl && !project.images /* If only imageUrl is present */ && (
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      className="rounded-t-lg mb-4 aspect-[16/10] object-cover"
                      width={400}
                      height={250}
                    />
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">{project.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        {project.status && (
                          <span className="text-xs bg-amber-700/30 text-amber-400 px-2 py-1 rounded-full">
                            {project.status}
                          </span>
                        )}
                        {project.sourceInfo && <span>Source: {project.sourceInfo}</span>}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  {project.images && project.images.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-white mb-4">Project Screenshots</h4>
                      <ImageGallery images={project.images} />
                    </div>
                  )}

                  {project.keyFeatures && (
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.keyFeatures.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.longDescription && (
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">Technical Implementation</h4>
                      <ul className="space-y-2 text-gray-300">
                        {project.longDescription.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <span className="text-gray-500 text-sm leading-none mt-0.5">•</span>
                            <span className="text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

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

                  {project.title === "BlackJack Pro" && (
                    <div className="bg-black p-4 rounded-lg border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300">
                      <h4 className="text-lg font-medium text-white mb-2">Commercial Project Notice</h4>
                      <p className="text-gray-300 text-sm">
                        This is a commercial project currently in development for release on iOS App Store and Android
                        Play Store. Source code is proprietary and not publicly available as this application is
                        intended for monetization through in-app purchases.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">No Current Projects</h2>
            <p className="text-gray-400">I'm currently planning my next project. Check back soon!</p>
          </div>
        )}
      </section>

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
