const { SCORE_WEIGHTS } = require("../constants");

exports.getJobsMatchingQuery = (candidate) => {
   const { skills, searchTerms, experienceLevel } = candidate;

   const matchingJobs = [
      // Filter active jobs
      { $match: { isActive: true, isRemoved: false } },

      // Calculate skill match score
      {
         $addFields: {
            skillMatchScore: {
               $divide: [
                  { $size: { $setIntersection: ["$skillsets", skills] } },
                  { $cond: [{ $eq: [{ $size: "$skillsets" }, 0] }, 1, { $size: "$skillsets" }] },
               ],
            },
            // Check if experience level matches
            experienceLevelMatchScore: {
               $cond: [{ $eq: ["$experienceLevel", experienceLevel] }, 1, 0],
            },

            // Calculate search term match score
            searchTermMatchScore: {
               $add: [
                  {
                     $divide: [
                        { $size: { $setIntersection: ["$skillsets", searchTerms] } },
                        {
                           $cond: [
                              { $eq: [{ $size: "$skillsets" }, 0] },
                              1,
                              { $size: "$skillsets" },
                           ],
                        },
                     ],
                  },
                  // Check for search terms in title and description
                  {
                     $sum: {
                        $map: {
                           input: searchTerms,
                           as: "term",
                           in: {
                              $cond: [
                                 {
                                    $gt: [
                                       {
                                          $indexOfCP: [
                                             { $toLower: "$title" },
                                             { $toLower: "$$term" },
                                          ],
                                       },
                                       -1,
                                    ],
                                 },
                                 0.5,
                                 0,
                              ],
                           },
                        },
                     },
                  },
                  {
                     $sum: {
                        $map: {
                           input: searchTerms,
                           as: "term",
                           in: {
                              $cond: [
                                 {
                                    $gt: [
                                       {
                                          $indexOfCP: [
                                             { $toLower: "$description" },
                                             { $toLower: "$$term" },
                                          ],
                                       },
                                       -1,
                                    ],
                                 },
                                 0.5,
                                 0,
                              ],
                           },
                        },
                     },
                  },
               ],
            },
         },
      },

      // Calculate total score and round to two decimal places
      {
         $addFields: {
            totalScore: {
               $round: [
                  {
                     $add: [
                        { $multiply: ["$skillMatchScore", SCORE_WEIGHTS.Skills_Match] },
                        { $multiply: [{ $divide: ["$searchTermMatchScore", 2] }, SCORE_WEIGHTS.SearchTerm_Match] }, // divided by 2 because searchTermMatchScore is 2 if all three matches
                        { $multiply: ["$experienceLevelMatchScore", SCORE_WEIGHTS.Experience_Match] },
                     ],
                  },
                  2,
               ],
            },
         },
      },

      // exclude these fields
      {
         $project: {
            skillMatchScore: 0,
            experienceLevelMatchScore: 0,
            searchTermMatchScore: 0,
         },
      },

      {
         $lookup: {
           from: 'recruiters',  // The collection name for Recruiter
           localField: 'user',
           foreignField: '_id',
           as: 'company',
         },
       },

       {
         $unwind: '$company',  // Optionally use $unwind to deconstruct the array
       },

      // Sort by total score in descending order
      { $sort: { totalScore: -1 } },

      // Limit results to 10
      { $limit: 10 },
   ];

   return matchingJobs;
};


exports.getCandidateMatchingQuery = (job) => {
    const { skillsets, experienceLevel, title, description } = job;
 
    const matchingCandidates = [
       // Calculate skill match score
       {
          $addFields: {
             skillMatchScore: {
                $divide: [
                   { $size: { $setIntersection: ["$skills", skillsets] } },
                   { $cond: [{ $eq: [{ $size: "$skills" }, 0] }, 1, { $size: "$skills" }] },
                ],
             },
             // Check if experience level matches
             experienceLevelMatchScore: {
                $cond: [{ $eq: ["$experienceLevel", experienceLevel] }, 1, 0],
             },
 
             // Calculate search term match score
             searchTermMatchScore: {
                $add: [
                   {
                      $divide: [
                         { $size: { $setIntersection: ["$searchTerms", skillsets] } },
                         {
                            $cond: [
                               { $eq: [{ $size: "$searchTerms" }, 0] },
                               1,
                               { $size: "$searchTerms" },
                            ],
                         },
                      ],
                   },
                   // Check for search terms in title and description
                   {
                      $sum: {
                         $map: {
                            input: "$searchTerms",
                            as: "term",
                            in: {
                               $cond: [
                                  {
                                     $gt: [
                                        {
                                           $indexOfCP: [
                                              { $toLower: title },
                                              { $toLower: "$$term" },
                                           ],
                                        },
                                        -1,
                                     ],
                                  },
                                  0.5,
                                  0,
                               ],
                            },
                         },
                      },
                   },
                   {
                      $sum: {
                         $map: {
                            input: "$searchTerms",
                            as: "term",
                            in: {
                               $cond: [
                                  {
                                     $gt: [
                                        {
                                           $indexOfCP: [
                                              { $toLower: description },
                                              { $toLower: "$$term" },
                                           ],
                                        },
                                        -1,
                                     ],
                                  },
                                  0.5,
                                  0,
                               ],
                            },
                         },
                      },
                   },
                ],
             },
          },
       },
 
       // Calculate total score and round to two decimal places
       {
          $addFields: {
             totalScore: {
                $round: [
                   {
                      $add: [
                         { $multiply: ["$skillMatchScore", SCORE_WEIGHTS.Skills_Match] },
                         { $multiply: [{ $divide: ["$searchTermMatchScore", 2] }, SCORE_WEIGHTS.SearchTerm_Match] }, // divided by 2 because searchTermMatchScore is 2 if all three matches
                         { $multiply: ["$experienceLevelMatchScore", SCORE_WEIGHTS.Experience_Match] },
                      ],
                   },
                   2,
                ],
             },
          },
       },
 
       // exclude these fields
       {
          $project: {
             skillMatchScore: 0,
             experienceLevelMatchScore: 0,
             searchTermMatchScore: 0,
          },
       },
 
       // Sort by total score in descending order
       { $sort: { totalScore: -1 } },
 
       // Limit results to 10
       { $limit: 10 },
    ];
 
    return matchingCandidates;
 };
