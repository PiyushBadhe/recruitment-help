import { DropDownOptionsMap, ReplacementKeywordMap } from "../types/general";

class Data {
    private emailOptions: DropDownOptionsMap = [
        {
            label: "Follow up mail - test/assignment",
            value: "followup_test",
            message: "Subject: Follow-up on [position name] Submitted Assignment\n\nDear [Recruiter's Name],\n\nI hope you're doing well.\n\nI wanted to follow up regarding the [test/assignment name] I submitted on [submission date] as part of the [position name] application process. I am keen to know if there are any updates or feedback you could share.\n\nPlease let me know if you need anything further from my end. I remain enthusiastic about the opportunity and look forward to hearing from you.\n\nThank you for your time and consideration.\n\nBest regards,\nPiyush Badhe\n+91 8806613528\nhttps://www.linkedin.com/in/piyush-badhe-dot-stack"
        },
        {
            label: "Follow up mail - interview",
            value: "followup_interview",
            message: "Subject: Follow-up on Interview for [Position Name]\n\nDear [Recruiter's Name],\n\nI hope this message finds you well.\n\nI wanted to follow up regarding our recent interview for the [position name] role that took place on [interview date]. I truly appreciated the opportunity to learn more about the team and the exciting work at [Company Name].\n\nI remain very interested in the position and would love to contribute my skills to your team. If there’s any additional information or clarification you need from my side, please feel free to reach out.\n\nLooking forward to your feedback.\n\nThank you for your time and consideration.\n\nBest regards,\nPiyush Badhe\n+91 8806613528\nhttps://www.linkedin.com/in/piyush-badhe-dot-stack"
        },
        {
            label: "Follow up mail - other",
            value: "followup_other",
            message: "Subject: Follow-up Regarding My Application\n\nDear [Recruiter's Name],\n\nI hope you're doing well.\n\nI'm writing to follow up on my application for any updates regarding the selection process for the [position name] role. I’m very interested in the opportunity to join [Company Name] and contribute meaningfully to your team.\n\nPlease let me know if there’s anything else you need from me to support the process. I look forward to your response and hope to hear from you soon.\n\nThank you once again for your time and consideration.\n\nBest regards,\nPiyush Badhe\n+91 8806613528\nhttps://www.linkedin.com/in/piyush-badhe-dot-stack"
        }
    ];

    private linkedInOptions: DropDownOptionsMap = [
        {
            label: "Connection request note - General",
            value: "connection_request",
            message: "Hi [Person Name],\nI came across your profile and was impressed by your work at [Company Name].\nI'd love to connect and stay in touch professionally. Thanks!"
        },
        {
            label: "Discuss opportunity - HR",
            value: "discuss_hr",
            message: "Hi [Person Name],\nI hope you're doing well.\n\nI came across the [Job Title] opening at [Company Name] on [Recruitment Platform] and wanted to express my interest directly. To streamline the process, I’m sharing my resume and a brief bio here for your consideration, as I believe I’m a strong fit for the role.\n\nLooking forward to your response.\nThank you!"
        },
        {
            label: "Discuss opportunity - New Connection",
            value: "discuss_other",
            message: "Hi [Person Name], I hope you're doing well.\nI'm currently exploring opportunities in [Your Field] and looking to secure a role soon.\nI found your journey at [Company Name] inspiring and would really appreciate any advice you could share.\nWould love to connect!"
        },
        {
            label: "Post Connection - Seek Advice",
            value: "post_connection",
            message: "Hi [Person Name], thanks for connecting!\nI’m Piyush Badhe, currently exploring opportunities in [Your Domain/Role].\nI’ve been inspired by your journey in this field and would really appreciate any advice or experiences you can share to help me grow and excel.\nLooking forward to learning from you!"
        },
    ];

    private linkedInFollowUpOptions: DropDownOptionsMap = [
        {
            label: "Follow up LinkedIn - test/assignment",
            value: "linkedin_followup_test",
            message: "Hi [Recruiter's Name], I hope you're doing well!\n\nI wanted to follow up on the [test/assignment name] I submitted on [submission date] for the [position name] role. I’m eager to know if there are any updates or feedback you could share.\n\nHappy to provide any additional information if needed. Looking forward to hearing from you!\n\nThank you,\nPiyush Badhe"
        },
        {
            label: "Follow up LinkedIn - interview",
            value: "linkedin_followup_interview",
            message: "Hi [Recruiter's Name], I hope your week is going well!\n\nI wanted to follow up on our interview for the [position name] role on [interview date]. It was a pleasure speaking with you and learning more about [Company Name] and the team.\n\nIf there are any updates or next steps, I’d be grateful to hear. Please let me know if you need anything further from me.\n\nThanks again,\nPiyush Badhe"
        },
        {
            label: "Follow up LinkedIn - other",
            value: "linkedin_followup_other",
            message: "Hi [Recruiter's Name], I hope you're doing well!\n\nJust following up on my application for the [position name] role. I’m genuinely excited about the opportunity to contribute to [Company Name] and be part of the team.\n\nPlease let me know if there are any updates. I’m happy to provide any additional information if needed.\n\nThanks again,\nPiyush Badhe"
        }
    ]

    private emailReplacementKeywords: ReplacementKeywordMap = {
        followup_test: [
            { label: "[position name]", value: "[position name]" },
            { label: "[Recruiter's Name]", value: "[Recruiter's Name]" },
            { label: "[test/assignment name]", value: "[test/assignment name]" },
            { label: "[submission date]", value: "[submission date]" },
        ],
        followup_interview: [
            { label: "[position name]", value: "[position name]" },
            { label: "[Recruiter's Name]", value: "[Recruiter's Name]" },
            { label: "[test/assignment name]", value: "[test/assignment name]" },
            { label: "[submission date]", value: "[submission date]" },
        ],
        followup_other: [
            { label: "[position name]", value: "[position name]" },
            { label: "[Recruiter's Name]", value: "[Recruiter's Name]" },
            { label: "[test/assignment name]", value: "[test/assignment name]" },
            { label: "[submission date]", value: "[submission date]" },
        ],
    };

    private linkedInReplacementKeywords: ReplacementKeywordMap = {
        connection_request: [
            { label: "[Person Name]", value: "[Person Name]" },
            { label: "[Company Name]", value: "[Company Name]" },
        ],
        discuss_hr: [
            { label: "[Person Name]", value: "[Person Name]" },
            { label: "[Company Name]", value: "[Company Name]" },
            { label: "[Job Title]", value: "[Job Title]" },
            { label: "[Recruitment Platform]", value: "[Recruitment Platform]" },
        ],
        discuss_other: [
            { label: "[Person Name]", value: "[Person Name]" },
            { label: "[Your Field]", value: "[Your Field]" },
            { label: "[Company Name]", value: "[Company Name]" },
        ],
        post_connection: [
            { label: "[Person Name]", value: "[Person Name]" },
            { label: "[Your Domain/Role]", value: "[Your Domain/Role]" },
        ],
    };

    private otherOptions: DropDownOptionsMap = [
        {
            label: "Profile Links",
            value: "profileLinks",
            message: "LinkedIn:\nhttps://www.linkedin.com/in/piyush-badhe-dot-stack\n\nGithub:\nhttps://github.com/PiyushBadhe\n\nHashNode\nhttps://hashnode.com/@piyushbadhe5"
        },
        {
            label: "Common indeed form fields",
            value: "indeedFormFields",
            message: "Availability:\nI'm available anytime, but I kindly request to be informed at least one day in advance to confirm my availability.\n\nPrevious Company Designation:\nTrainee Software Developer\n\nPrevious Company Details:\ni-TEK RFID, Pune"
        },
        {
            label: "Work Summary",
            value: "workSummary",
            message: "At i-Tek RFID, dedicated to delivering high-quality software solutions within tight deadlines, with responsibilities including:\n•	Developed and optimized scalable web applications, improving website responsiveness by 45%.\n•	Streamlined SDLC processes, reducing project delivery time by 30%.\n•	Collaborated with cross-functional teams to analyze requirements and deliver user-friendly solutions.\n•	Engineered logical architectures and integrated diverse functionalities.\n•	Performed rigorous software testing, including unit tests, to ensure system reliability.\n•	Documented development processes for smoother project handovers."
        },
        {
            label: "Work Summary (below 255 chars)",
            value: "workSummary255chars",
            message: "At i-Tek RFID, developed scalable web apps improving responsiveness by 45%, streamlined SDLC to cut delivery time by 30%, collaborated across teams, engineered architectures, ensured reliability via testing, and documented for smooth handovers."
        },
        {
            label: "Curriculum Vitae",
            value: "curriculumVitae",
            message: "Piyush Badhe\n +91 8806613528 |  https://www.linkedin.com/in/piyush-badhe-dot-stack\n badhepiyush7@gmail.com  |  https://github.com/PiyushBadhe\n\nSummary\nFull Stack Developer with 1+ year of experience in Node.js and React.js, primarily in retail and e-commerce. Built 5+ full-stack projects using Node, React, and PostgreSQL. Currently upskilling in scalable API and modern frontend development. Eager to contribute to impactful software teams.\n\nExperience\nTrainee Software Developer | i-Tek RFID, Bangalore | Nov 2021 – Dec 2022\n - Built responsive web apps; improved performance by 45%.\n - Reduced delivery time by 30% through optimized SDLC workflows.\n - Collaborated cross-functionally to develop scalable, user-friendly solutions.\n - Conducted unit testing and documented systems for maintainability.\n\nCareer Break – Technical Upskilling | Aug 2023 – Sep 2024\n - Hands-on practice with TypeScript, React (Hooks, State Mgmt), Node.js, and API design.\n - Followed best practices in frontend testing (Jest, React Testing Library) and performance optimization.\n\nEducation\nPost Graduate Diploma in Data Science\nIIIT (International Institute of Information Technology) – Sep 2024 – Dec 2024\n\nB.E. in Computer Engineering\nSinhgad Institute of Technology, Lonavala – Aug 2016 – Jun 2021\n\nTechnical Skills\nLanguages: JavaScript, TypeScript, SQL, Java, Python\nFrontend: React.js, Tailwind CSS\nBackend: Node.js, Express.js, Spring Boot\nDatabase: PostgreSQL, MySQL, MongoDB\nTools: Git, Postman, VS Code, IntelliJ, Eclipse\n\nSoft Skills\nAnalytical Mindset • Fast Learner • Strong Communicator • Team-Oriented"
        },
    ]

    public dropDownListLinkedIn: DropDownOptionsMap;
    public dropDownListEmail: DropDownOptionsMap;
    public dropDownListOthers: DropDownOptionsMap;
    public replacementKeywords: ReplacementKeywordMap;

    constructor() {
        this.dropDownListOthers = [
            ...this.otherOptions,
        ];
        this.dropDownListLinkedIn = [
            ...this.linkedInOptions,
            ...this.linkedInFollowUpOptions,
        ];
        this.dropDownListEmail = [
            ...this.emailOptions,
        ];
        this.replacementKeywords = {
            ...this.emailReplacementKeywords,
            ...this.linkedInReplacementKeywords,
        };
    }
}

export default new Data();
