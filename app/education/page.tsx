// tells Next.js this component runs on the client side (needed for interactivity)
"use client"

// import useState for managing the expanded course sections
import { useState } from "react"

// import reusable UI card components and icons
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, ChevronDown, ChevronUp } from "lucide-react"

// main component for the education and coursework page
export default function EducationPage() {
  // track which courses are currently expanded (open) using a Set for efficient lookups
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())

  // toggles a course card open or closed by adding/removing it from the Set
  const toggleCourse = (courseId: string) => {
    const newExpanded = new Set(expandedCourses)
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId) // collapse if already open
    } else {
      newExpanded.add(courseId) // expand if closed
    }
    setExpandedCourses(newExpanded)
  }

  // organized data for all courses, grouped by category (CIS, COB, ECON, CS)
  // this format allows looping through groups with Object.entries()
  const coursesByCategory = {
    cis: [
      {
        id: "CIS 301",
        name: "Cloud Server Management",
        description:
          "Introduction to cloud computing concepts, server virtualization, and cloud service management. Covers AWS, Azure, and Google Cloud platforms.",
        learningOutcomes: [
          "Understanding of cloud computing fundamentals and service models (IaaS, PaaS, SaaS)",
          "Hands-on experience with AWS EC2, S3, and other core services",
          "Server configuration and management in cloud environments",
          "Cost optimization and security best practices in cloud deployments",
        ],
      },
      {
        id: "CIS 304",
        name: "Enterprise Architecture",
        description:
          "Study of enterprise-level system design, architecture patterns, and integration strategies for large-scale business applications.",
        learningOutcomes: [
          "Enterprise architecture frameworks and methodologies",
          "System integration patterns and best practices",
          "Scalability and performance considerations in enterprise systems",
          "Business process modeling and workflow design",
        ],
      },
      {
        id: "CIS 320",
        name: "Comp & Telecomm Networks",
        description:
          "Comprehensive study of computer networks, telecommunications, network protocols, and network security fundamentals.",
        learningOutcomes: [
          "OSI and TCP/IP network models and protocols",
          "Network hardware components and configuration",
          "Network security principles and implementation",
          "Troubleshooting and network performance optimization",
        ],
      },
      {
        id: "CIS 330",
        name: "Database Design & Application",
        description:
          "Database design principles, SQL programming, normalization, and database application development using relational database systems.",
        learningOutcomes: [
          "Relational database design and normalization techniques",
          "Advanced SQL queries, joins, and stored procedures",
          "Database performance tuning and optimization",
          "Integration of databases with web applications",
        ],
      },
      {
        id: "CIS 331",
        name: "Inter Computer Programming",
        description:
          "Intermediate programming concepts including object-oriented programming, data structures, and algorithm design using modern programming languages.",
        learningOutcomes: [
          "Object-oriented programming principles and design patterns",
          "Data structures implementation and analysis",
          "Algorithm design and complexity analysis",
          "Software development best practices and testing methodologies",
        ],
      },
      {
        id: "CIS 454",
        name: "Systems Analysis & Design",
        description:
          "Systematic approach to analyzing business requirements and designing information systems solutions using industry-standard methodologies.",
        learningOutcomes: [
          "Requirements gathering and analysis techniques",
          "System design methodologies and documentation",
          "UML modeling and system architecture design",
          "Project management and software development lifecycle",
        ],
      },
      {
        id: "CIS 463",
        name: "Business Intelligence",
        description:
          "Data warehousing, data mining, and business analytics tools for extracting insights from business data to support decision-making.",
        learningOutcomes: [
          "Data warehousing concepts and ETL processes",
          "Business intelligence tools and dashboard creation",
          "Data mining techniques and predictive analytics",
          "Key performance indicators (KPIs) and business metrics analysis",
        ],
      },
      {
        id: "CIS 484",
        name: "Info Systems Development and Implementation",
        description:
          "Capstone course focusing on complete system development lifecycle from planning through implementation and maintenance.",
        learningOutcomes: [
          "Full-stack application development and deployment",
          "Project planning and team collaboration",
          "System testing, quality assurance, and user acceptance",
          "Change management and system maintenance strategies",
        ],
      },
      {
        id: "CIS 498",
        name: "Special Topics in CIS",
        subtitle: "Python for Data Analysis & Visualization",
        description:
          "Specialized course focusing on Python programming for data analysis, statistical computing, and data visualization techniques.",
        learningOutcomes: [
          "Python programming for data manipulation using pandas and NumPy",
          "Statistical analysis and hypothesis testing",
          "Data visualization using matplotlib, seaborn, and plotly",
          "Machine learning fundamentals and implementation",
        ],
      },
    ],
    cob: [
      {
        id: "COB 160",
        name: "Business Decisions in Modern Society",
        description:
          "Introduction to business fundamentals, ethical decision-making, and the role of business in society and global markets.",
        learningOutcomes: [
          "Understanding of business ethics and corporate social responsibility",
          "Analysis of business impact on society and environment",
          "Decision-making frameworks for complex business scenarios",
          "Global business perspectives and cultural considerations",
        ],
      },
      {
        id: "COB 191",
        name: "Business Analytics I",
        description:
          "Introduction to quantitative methods and statistical analysis for business decision-making using Excel and statistical software.",
        learningOutcomes: [
          "Descriptive statistics and data summarization techniques",
          "Probability distributions and statistical inference",
          "Excel modeling and analysis tools",
          "Business forecasting and trend analysis",
        ],
      },
      {
        id: "COB 202",
        name: "Interpersonal Skills",
        description:
          "Development of communication, leadership, and teamwork skills essential for professional business environments.",
        learningOutcomes: [
          "Effective verbal and written communication techniques",
          "Team dynamics and collaborative problem-solving",
          "Leadership styles and conflict resolution strategies",
          "Professional presentation and networking skills",
        ],
      },
      {
        id: "COB 241",
        name: "Financial Accounting",
        description:
          "Fundamental principles of financial accounting, financial statement preparation, and analysis for business decision-making.",
        learningOutcomes: [
          "Financial statement preparation and analysis",
          "Generally Accepted Accounting Principles (GAAP)",
          "Revenue recognition and expense matching principles",
          "Cash flow analysis and financial ratio interpretation",
        ],
      },
      {
        id: "COB 242",
        name: "Managerial Accounting",
        description:
          "Cost accounting principles, budgeting, and performance measurement for internal management decision-making.",
        learningOutcomes: [
          "Cost behavior analysis and cost-volume-profit relationships",
          "Budgeting and variance analysis techniques",
          "Performance measurement and balanced scorecard approaches",
          "Capital budgeting and investment decision analysis",
        ],
      },
      {
        id: "COB 291",
        name: "Business Analytics II",
        description:
          "Advanced quantitative methods including regression analysis, optimization, and predictive modeling for business applications.",
        learningOutcomes: [
          "Multiple regression analysis and model building",
          "Linear programming and optimization techniques",
          "Time series analysis and forecasting methods",
          "Decision analysis and risk assessment",
        ],
      },
      {
        id: "COB 300A",
        name: "Integrative Business: Management",
        description:
          "Comprehensive study of management principles, organizational behavior, and strategic planning in business organizations.",
        learningOutcomes: [
          "Management theories and organizational structure design",
          "Human resource management and employee motivation",
          "Strategic planning and competitive analysis",
          "Change management and organizational development",
        ],
      },
      {
        id: "COB 300B",
        name: "Integrative Business: Finance",
        description:
          "Corporate finance principles including capital structure, investment analysis, and financial risk management.",
        learningOutcomes: [
          "Time value of money and capital budgeting techniques",
          "Capital structure optimization and cost of capital",
          "Financial risk management and derivative instruments",
          "Working capital management and cash flow optimization",
        ],
      },
      {
        id: "COB 300C",
        name: "Integrative Business: Operations",
        description:
          "Operations management principles including supply chain management, quality control, and process optimization.",
        learningOutcomes: [
          "Supply chain design and logistics management",
          "Quality management systems and continuous improvement",
          "Inventory management and demand forecasting",
          "Process analysis and lean manufacturing principles",
        ],
      },
      {
        id: "COB 300D",
        name: "Integrative Business: Marketing",
        description:
          "Marketing strategy development, consumer behavior analysis, and digital marketing in contemporary business environments.",
        learningOutcomes: [
          "Market research and consumer behavior analysis",
          "Marketing mix strategy and brand management",
          "Digital marketing and social media strategies",
          "Customer relationship management and retention strategies",
        ],
      },
      {
        id: "COB 318",
        name: "Legal & Ethical Envir Business",
        description:
          "Business law fundamentals, regulatory compliance, and ethical frameworks for business decision-making.",
        learningOutcomes: [
          "Contract law and business legal structures",
          "Regulatory compliance and risk management",
          "Intellectual property and employment law",
          "Ethical decision-making frameworks and corporate governance",
        ],
      },
      {
        id: "COB 487",
        name: "Strategic Management",
        description:
          "Capstone course integrating business disciplines to develop comprehensive strategic plans and competitive strategies.",
        learningOutcomes: [
          "Strategic analysis and competitive positioning",
          "Business model innovation and value creation",
          "Mergers, acquisitions, and strategic alliances",
          "Implementation and performance measurement of strategic initiatives",
        ],
      },
    ],
    econ: [
      {
        id: "ECON 200",
        name: "Introduction to Macroeconomics",
        description:
          "Study of aggregate economic behavior, including national income, employment, inflation, and monetary and fiscal policy.",
        learningOutcomes: [
          "Understanding of GDP, inflation, and unemployment measurements",
          "Monetary and fiscal policy effects on economic growth",
          "International trade and exchange rate impacts",
          "Economic cycles and government intervention strategies",
        ],
      },
      {
        id: "ECON 201",
        name: "Introduction to Microeconomics",
        description:
          "Analysis of individual economic units including consumer behavior, firm production decisions, and market structures.",
        learningOutcomes: [
          "Supply and demand analysis and market equilibrium",
          "Consumer choice theory and utility maximization",
          "Production costs and profit maximization strategies",
          "Market structures and competitive analysis",
        ],
      },
    ],
    cs: [
      {
        id: "CS 101",
        name: "Intro to Computer Science",
        description:
          "Introduction to computer science concepts, computational thinking, and basic programming principles using visual programming tools.",
        learningOutcomes: [
          "Computational thinking and problem-solving strategies",
          "Basic programming concepts and algorithm design",
          "Computer systems and software/hardware interaction",
          "Introduction to data representation and computer ethics",
        ],
      },
      {
        id: "CS 149",
        name: "Introduction to Programming",
        description:
          "Fundamental programming concepts using a high-level programming language, including variables, control structures, and functions.",
        learningOutcomes: [
          "Programming fundamentals including variables and data types",
          "Control structures: loops, conditionals, and functions",
          "Basic data structures and algorithm implementation",
          "Debugging techniques and software development practices",
        ],
      },
    ],
  }

  // defines how each course category should be labeled and colored
  const categoryInfo = {
    cis: { title: "Computer Information Systems (CIS)", color: "text-green-400" },
    cob: { title: "College of Business (COB)", color: "text-blue-400" },
    econ: { title: "Economics (ECON)", color: "text-yellow-400" },
    cs: { title: "Computer Science (CS)", color: "text-purple-400" },
  }

  // renders the full layout with hero, degree info, and dynamic course cards
  return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-12">
        {/* Header section with page title and summary */}
        <section id="education-hero" className="text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Education & Coursework</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Details about my academic journey at James Madison University and key coursework in Computer Information
            Systems.
          </p>
        </section>

        {/* Degree info card: school, major, graduation */}
        <section id="degree-info">
          <Card className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300">
            <CardHeader className="flex flex-row items-start space-x-4">
              <GraduationCap className="w-12 h-12 text-emerald-400 mt-1" />
              <div>
                <CardTitle className="text-2xl text-white">James Madison University</CardTitle>
                <CardDescription className="text-gray-400">Harrisonburg, VA | Graduated May 2025</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="ml-16">
                <p className="text-lg text-gray-300">Bachelor of Business Administration</p>
                <p className="text-gray-300">Major in Computer Information Systems</p>
                <p className="text-gray-300">Concentration in Information Systems</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Coursework section grouped by category */}
        <section id="coursework">
          <h2 className="text-3xl font-semibold text-white mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-emerald-400" />
            Relevant Coursework
          </h2>
          <div className="space-y-8">
            {/* loop through each course category (cis, cob, econ, cs) */}
            {Object.entries(coursesByCategory).map(([category, courses]) => (
              <div key={category}>
                {/* category title with color coding */}
                <h3 className={`text-xl font-semibold mb-4 ${categoryInfo[category as keyof typeof categoryInfo].color}`}>
                  {categoryInfo[category as keyof typeof categoryInfo].title}
                </h3>

                {/* display course cards in responsive grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <Card
                      key={course.id}
                      className="bg-black border-2 border-gray-700 hover:border-emerald-400 transition-colors duration-300"
                    >
                      {/* card header clickable for expand/collapse */}
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleCourse(course.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-white leading-tight">{course.id}</CardTitle>
                            <CardDescription className="text-gray-300 text-base leading-tight">
                              {course.name}
                            </CardDescription>
                            {course.subtitle && <p className="text-sm text-gray-400 italic">({course.subtitle})</p>}
                          </div>
                          {/* show chevron up/down depending on open state */}
                          {expandedCourses.has(course.id) ? (
                            <ChevronUp className="w-5 h-5 text-emerald-400 ml-2 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-emerald-400 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>

                      {/* only show description and outcomes if expanded */}
                      {expandedCourses.has(course.id) && (
                        <CardContent className="pt-0 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-2">Course Description</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">{course.description}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-2">Key Learning Outcomes</h4>
                            <ul className="space-y-1">
                              {course.learningOutcomes.map((outcome, index) => (
                                <li key={index} className="text-sm text-gray-300 flex items-start">
                                  <span className="text-emerald-400 mr-2 mt-1">•</span>
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
  )
}
