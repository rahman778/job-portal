exports.SCORE_WEIGHTS = {
   Skills_Match: 0.6,
   SearchTerm_Match: 0.3,
   Experience_Match: 0.1,
};

exports.ROLES = {
   Admin: "ROLE_ADMIN",
   Recruiter: "ROLE_RECRUITER",
   Candidate: "ROLE_CANDIDATE",
};

exports.RECRUITER_STATUS = {
   Rejected: "Rejected",
   Approved: "Approved",
   Waiting_Approval: "Waiting Approval",
};

exports.APPLICATION_STATUS = {
   Screening: "Screening",
   Interview: "Interview",
   Shortlisted: "Shortlisted",
   Rejected: "Rejected",
};

exports.JOB_TYPE = {
   Full_Time: "Full-Time",
   Part_Time: "Part-Time",
   Internship: "Internship",
   Contract: "Contract",
};

exports.JOB_MODALITY = {
   Remote: "Remote",
   On_Site: "On-Site",
   Hybrid: "Hybrid",
};

exports.EXPERIENCE = {
   Beginner: "Beginner",
   Intermediate: "Intermediate",
   Expert: "Expert",
};

exports.EMAIL_PROVIDER = {
   Email: "Email",
   Google: "Google",
};

exports.JWT_COOKIE = "x-jwt-cookie";
