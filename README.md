# Josiah Xayavong - Personal Portfolio Website

Welcome to the repository for my personal portfolio website! This project showcases my skills, projects, professional experience, and educational background. It's built with modern web technologies to be performant, responsive, and visually appealing.

**Live Demo:** [Your Live Portfolio URL Here] (e.g., `https://josiahxayavong.com`)

## Description

This portfolio is a Next.js application styled with Tailwind CSS and enhanced with Framer Motion for animations. It features dedicated sections for my projects (including image galleries and downloadable documents), education, and a functional contact form using Resend for email delivery.

## Key Features

*   **Responsive Design:** Adapts to all screen sizes, from mobile to desktop.
*   **Project Showcase:** Detailed display of current and past projects with descriptions, image galleries, key features, technologies used, and source code/documentation links.
*   **Downloadable Documents:** Ability to link and download PDF documents (e.g., project documentation, resume).
*   **Education Section:** Lists academic achievements and relevant coursework with expandable details.
*   **Interactive Contact Form:** Allows visitors to send messages directly, integrated with Resend for email notifications.
*   **Smooth Animations:** Subtle and engaging animations using Framer Motion.
*   **Dynamic Navigation:** Sticky navigation bar that appears on scroll and a mobile-friendly bottom navigation.
*   **SEO Friendly:** Built with Next.js for server-side rendering and SEO benefits.
*   **Dark Theme:** Consistent dark theme aesthetic.

## Technologies Used

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (App Router)
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Framer Motion](https://www.framer.com/motion/) (for animations)
    *   [Lucide React Icons](https://lucide.dev/)
*   **Backend (Contact Form):**
    *   Next.js API Routes
    *   [Resend](https://resend.com/) (for sending emails)
*   **Deployment:**
    *   [Vercel](https://vercel.com/) (Recommended)

## Project Structure

\`\`\`
portfolio-website/
├── app/                      # Next.js App Router: pages, layouts, API routes
│   ├── (main-content)/       # Route group for main pages
│   │   ├── page.tsx          # Homepage
│   │   ├── projects/page.tsx # Projects page
│   │   ├── education/page.tsx# Education page
│   │   └── layout.tsx        # Main layout for these pages
│   ├── api/contact/route.ts  # API route for the contact form
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
│   ├── ui/                   # Shadcn/UI components (Button, Card, etc.)
│   ├── layout/               # Layout components (Navbar, Footer)
│   ├── contact-form.tsx      # Contact form component
│   └── theme-provider.tsx    # Theme provider for dark mode
├── public/                   # Static assets
│   ├── images/               # Project images, profile photo
│   ├── documents/            # PDF documents for download
│   └── ...                   # Other static files (favicon, etc.)
├── lib/                      # Utility functions (e.g., cn for classnames)
├── .env.local                # Environment variables (local development)
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
\`\`\`

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/josiahxayavong/portfolio-website.git
    cd portfolio-website
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project. This file is for local development and should not be committed to Git.
    Add the following environment variable:

    \`\`\`env
    RESEND_API_KEY=your_resend_api_key_here
    \`\`\`
    *   Replace `your_resend_api_key_here` with your actual API key from [Resend](https://resend.com/).
    *   For detailed instructions on obtaining a Resend API key and setting up your domain, refer to the `SETUP_INSTRUCTIONS.md` file in this repository.

4.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Adding and Modifying Content

### Projects

*   Project data is managed in `app/projects/page.tsx`.
*   Modify the `currentProjects` and `pastProjects` arrays. Each project object should conform to the `Project` interface defined in the same file.
*   **Images:** Place project images in `public/images/` and update the `src` path in the project's `images` array.
*   **PDF Documents:**
    1.  Place PDF files in the `public/documents/` directory.
    2.  In `app/projects/page.tsx`, for the relevant project, add or update its `documents` array. Each document object needs a `title`, `fileName` (matching the exact file name in `public/documents/`), and `description`.

### Education

*   Education and coursework data is managed in `app/education/page.tsx`.
*   Update the `coursesByCategory` object to add, remove, or modify courses and their details.

### Personal Information

*   **Homepage (`app/page.tsx`):** Update your name, tagline, contact details (email, phone), social links, "About Me" section, experience, certifications, skills, and interests directly in this file.
*   **Profile Photo:** Replace `public/images/profile-photo.jpg` with your photo.
*   **Navbar & Footer (`app/layout.tsx`, `components/layout/navbar.tsx`):** Update initials, copyright year, etc.

## Contact Form

*   The contact form is handled by `components/contact-form.tsx` and submits data to the API route `app/api/contact/route.ts`.
*   This API route uses the Resend SDK to send an email to `josiahxaya@gmail.com` (you can change this in the API route).
*   Ensure your `RESEND_API_KEY` is correctly set in your environment variables for the form to function.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/), the creators of Next.js.

1.  Push your code to a GitHub repository.
2.  Sign up or log in to [Vercel](https://vercel.com/).
3.  Import your GitHub repository.
4.  **Configure Environment Variables:**
    *   In your Vercel project settings, add the `RESEND_API_KEY` environment variable with the same value as in your `.env.local` file.
5.  Deploy! Vercel will automatically detect it's a Next.js project and configure the build settings.

## Customization

*   **Styling:**
    *   Global styles are in `app/globals.css`.
    *   Most styling is done using [Tailwind CSS](https://tailwindcss.com/) utility classes directly in the TSX components.
    *   Customize Tailwind configuration in `tailwind.config.ts`.
*   **Animations:**
    *   Animations are primarily handled by [Framer Motion](https://www.framer.com/motion/). Look for `<motion.*>` components and `variants` props within the TSX files.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. (You can choose a different license or remove this section if you prefer).

---

Thank you for checking out my portfolio project! If you have any questions or suggestions, feel free to contact me.
