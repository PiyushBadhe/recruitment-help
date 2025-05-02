export const emailOptions = [
    {
        label: "Follow up mail - test/assignment",
        value: "followup_test",
        message: "Subject: Follow-up on [position name] Submitted Assignment\n\nDear [Recruiter's Name],\n\nI hope you're doing well.\n\nI wanted to follow up regarding the [test/assignment name] I submitted on [submission date] as part of the [position name] application process. I am keen to know if there are any updates or feedback you could share.\n\nPlease let me know if you need anything further from my end. I remain enthusiastic about the opportunity and look forward to hearing from you.\n\nThank you for your time and consideration.\n\nBest regards,\nPiyush Badhe\n+91 8806613528\nhttps://www.linkedin.com/in/piyush-badhe-dot-stack"
    },
    { label: "Follow up mail - interview", value: "followup_interview", message: "Follow up after an interview." },
    { label: "Follow up mail - other", value: "followup_other", message: "Follow up for other purposes." },
];

export const linkedInOptions = [
    { label: "Connection request note", value: "connection_request", message: "Send a note with your LinkedIn connection request." },
    { label: "Discuss opportunity - HR", value: "discuss_hr", message: "Discuss job opportunities with HR professionals." },
    { label: "Discuss opportunity - other", value: "discuss_other", message: "Discuss job opportunities with other professionals." },
    { label: "Introduce yourself", value: "introduce", message: "Introduce yourself to a new connection." },
];

export const replacementKeywords = {
    connection_request: [
        { label: "[position name]", value: "position_name" },
        { label: "[Recruiter's Name]", value: "recruiter_name" },
        { label: "[test/assignment name]", value: "assignment_name" },
        { label: "[submission date]", value: "submission_date" },
    ],
    discuss_hr: [
        { label: "dfdfdfdfdfdf", value: "position_name" },
        { label: "[Recruiter's Name]", value: "recruiter_name" },
        { label: "[test/assignment name]", value: "assignment_name" },
        { label: "[submission date]", value: "submission_date" },
    ],
    discuss_other: [
        { label: "122544552222", value: "position_name" },
        { label: "[Recruiter's Name]", value: "recruiter_name" },
        { label: "[test/assignment name]", value: "assignment_name" },
        { label: "[submission date]", value: "submission_date" },
    ],
    introduce: [
        { label: "ooooooooooooo", value: "position_name" },
        { label: "[Recruiter's Name]", value: "recruiter_name" },
        { label: "[test/assignment name]", value: "assignment_name" },
        { label: "[submission date]", value: "submission_date" },
    ]
}