export const MOCK_SEARCH_RESULTS = {
  candidateList: {
    candidate: [
      {
        candidateId: '9490',
        firstName: 'Jane',
        lastName: 'Smith',
        party: 'Democrat',
        officeName: 'U.S. Representative',
        officeTypeId: 'C',
        stateId: 'TX',
        stateName: 'Texas',
        officeDistrictName: 'District 18',
      },
      {
        candidateId: '9491',
        firstName: 'Robert',
        lastName: 'Smith',
        party: 'Republican',
        officeName: 'U.S. Senator',
        officeTypeId: 'S',
        stateId: 'TX',
        stateName: 'Texas',
      },
      {
        candidateId: '9492',
        firstName: 'Maria',
        lastName: 'Smith',
        party: 'Democrat',
        officeName: 'State Representative',
        officeTypeId: 'L',
        stateId: 'CA',
        stateName: 'California',
        officeDistrictName: 'District 40',
      },
    ],
  },
}

export const MOCK_BIO: Record<string, object> = {
  '9490': {
    bio: {
      candidate: {
        candidateId: '9490',
        firstName: 'Jane',
        lastName: 'Smith',
        party: 'Democrat',
        photo: '1',
        birthDate: '03/15/1968',
        birthPlace: 'Houston, TX',
        email: 'jane.smith@house.gov',
        phone: '(202) 555-0101',
        website: 'https://janesmith.house.gov',
        education: {
          item: [
            { degree: 'B.A. Political Science, University of Texas, 1990' },
            { degree: 'J.D., Harvard Law School, 1993' },
          ],
        },
      },
      office: {
        title: 'U.S. Representative',
        name: 'Texas 18th Congressional District',
        stateId: 'TX',
        district: '18',
        firstElect: '2012',
        termEnd: '01/03/2027',
      },
    },
  },
  '9491': {
    bio: {
      candidate: {
        candidateId: '9491',
        firstName: 'Robert',
        lastName: 'Smith',
        party: 'Republican',
        photo: '1',
        birthDate: '07/22/1960',
        birthPlace: 'Dallas, TX',
        email: 'robert.smith@senate.gov',
        phone: '(202) 555-0202',
        website: 'https://robertsmith.senate.gov',
        education: {
          item: [
            { degree: 'B.S. Business, Texas A&M University, 1982' },
            { degree: 'M.B.A., Wharton School, 1985' },
          ],
        },
      },
      office: {
        title: 'U.S. Senator',
        name: 'Texas',
        stateId: 'TX',
        firstElect: '2008',
        termEnd: '01/03/2029',
      },
    },
  },
  '9492': {
    bio: {
      candidate: {
        candidateId: '9492',
        firstName: 'Maria',
        lastName: 'Smith',
        party: 'Democrat',
        photo: '1',
        birthDate: '11/05/1975',
        birthPlace: 'Los Angeles, CA',
        email: 'maria.smith@assembly.ca.gov',
        phone: '(916) 555-0303',
        website: 'https://assembly.ca.gov/smith',
        education: {
          item: [
            { degree: 'B.A. Environmental Studies, UCLA, 1997' },
            { degree: 'M.P.P., UC Berkeley, 2000' },
          ],
        },
      },
      office: {
        title: 'State Representative',
        name: 'California Assembly District 40',
        stateId: 'CA',
        district: '40',
        firstElect: '2016',
        termEnd: '11/30/2026',
      },
    },
  },
}

export const MOCK_VOTES: Record<string, object> = {
  '9490': {
    bills: {
      bill: [
        { billId: 'HR1234', title: 'Infrastructure Investment and Jobs Act', date: '2023-11-06', action: 'Yea', result: 'Passed', category: 'Transportation' },
        { billId: 'HR2345', title: 'Inflation Reduction Act', date: '2023-08-12', action: 'Yea', result: 'Passed', category: 'Budget/Appropriations' },
        { billId: 'HR3456', title: 'CHIPS and Science Act', date: '2023-07-28', action: 'Yea', result: 'Passed', category: 'Science/Technology' },
        { billId: 'HR4567', title: 'Protect Medicare and Social Security Act', date: '2023-05-15', action: 'Yea', result: 'Failed', category: 'Social Welfare' },
        { billId: 'HR5678', title: 'Secure Border Act', date: '2024-01-20', action: 'Nay', result: 'Passed', category: 'Homeland Security' },
        { billId: 'HR6789', title: 'American Energy Act', date: '2024-02-14', action: 'Nay', result: 'Failed', category: 'Energy/Environment' },
        { billId: 'HR7890', title: 'Fiscal Responsibility Act', date: '2024-03-01', action: 'Yea', result: 'Passed', category: 'Budget/Appropriations' },
        { billId: 'HR8901', title: 'NDAA FY2024', date: '2023-12-14', action: 'Yea', result: 'Passed', category: 'National Defense' },
      ],
    },
  },
  '9491': {
    bills: {
      bill: [
        { billId: 'S1001', title: 'Border Security and Immigration Reform Act', date: '2024-01-10', action: 'Yea', result: 'Failed', category: 'Homeland Security' },
        { billId: 'S1002', title: 'Energy Independence Act', date: '2024-02-05', action: 'Yea', result: 'Passed', category: 'Energy/Environment' },
        { billId: 'S1003', title: 'Tax Cuts and Jobs Extension Act', date: '2023-11-20', action: 'Yea', result: 'Failed', category: 'Taxation' },
        { billId: 'S1004', title: 'Second Amendment Preservation Act', date: '2023-09-14', action: 'Yea', result: 'Failed', category: 'Civil Liberties' },
        { billId: 'S1005', title: 'NDAA FY2024', date: '2023-12-14', action: 'Yea', result: 'Passed', category: 'National Defense' },
        { billId: 'S1006', title: 'Inflation Reduction Act', date: '2023-08-07', action: 'Nay', result: 'Passed', category: 'Budget/Appropriations' },
      ],
    },
  },
  '9492': {
    bills: {
      bill: [
        { billId: 'AB101', title: 'California Clean Energy Future Act', date: '2024-03-10', action: 'Yea', result: 'Passed', category: 'Energy/Environment' },
        { billId: 'AB102', title: 'Affordable Housing Initiative', date: '2024-02-22', action: 'Yea', result: 'Passed', category: 'Housing' },
        { billId: 'AB103', title: 'Public Education Funding Reform', date: '2023-10-15', action: 'Yea', result: 'Passed', category: 'Education' },
        { billId: 'AB104', title: 'Small Business Tax Relief Act', date: '2023-08-01', action: 'Abstain', result: 'Passed', category: 'Taxation' },
      ],
    },
  },
}

export const MOCK_RATINGS: Record<string, object> = {
  '9490': {
    candidateRating: {
      rating: [
        { ratingId: 'R1', ratingName: '2023 Legislative Scorecard', sigId: 'SIG1', sigName: 'Sierra Club', rating: '92', ratingText: 'Strong supporter of environmental protection legislation', timespan: '2023' },
        { ratingId: 'R2', ratingName: '2022 Voting Record', sigId: 'SIG2', sigName: 'AFL-CIO', rating: '88', ratingText: 'Consistent supporter of workers\' rights and union interests', timespan: '2022' },
        { ratingId: 'R3', ratingName: '2023 Rating', sigId: 'SIG3', sigName: 'NRA', rating: 'F', ratingText: 'Opposed to NRA-backed legislation', timespan: '2023' },
        { ratingId: 'R4', ratingName: '2022-2023 Scorecard', sigId: 'SIG4', sigName: 'NFIB (Small Business)', rating: '22', ratingText: 'Voted against majority of small business priorities', timespan: '2022-2023' },
        { ratingId: 'R5', ratingName: '2023 Healthcare Rating', sigId: 'SIG5', sigName: 'AARP', rating: '95', ratingText: 'Champions Medicare and Social Security protections', timespan: '2023' },
        { ratingId: 'R6', ratingName: '2022 Scorecard', sigId: 'SIG6', sigName: 'Chamber of Commerce', rating: '35', ratingText: 'Below average support for business-friendly legislation', timespan: '2022' },
      ],
    },
  },
  '9491': {
    candidateRating: {
      rating: [
        { ratingId: 'R7', ratingName: '2023 Rating', sigId: 'SIG3', sigName: 'NRA', rating: 'A+', ratingText: 'Staunch defender of Second Amendment rights', timespan: '2023' },
        { ratingId: 'R8', ratingName: '2022-2023 Scorecard', sigId: 'SIG4', sigName: 'NFIB (Small Business)', rating: '91', ratingText: 'Strong advocate for small business interests', timespan: '2022-2023' },
        { ratingId: 'R9', ratingName: '2022 Scorecard', sigId: 'SIG6', sigName: 'Chamber of Commerce', rating: '87', ratingText: 'Reliable supporter of business-friendly policies', timespan: '2022' },
        { ratingId: 'R10', ratingName: '2023 Legislative Scorecard', sigId: 'SIG1', sigName: 'Sierra Club', rating: '8', ratingText: 'Rarely supports environmental protection legislation', timespan: '2023' },
        { ratingId: 'R11', ratingName: '2022 Voting Record', sigId: 'SIG2', sigName: 'AFL-CIO', rating: '14', ratingText: 'Limited support for organized labor priorities', timespan: '2022' },
      ],
    },
  },
  '9492': {
    candidateRating: {
      rating: [
        { ratingId: 'R12', ratingName: '2023 State Scorecard', sigId: 'SIG1', sigName: 'California League of Conservation Voters', rating: '97', ratingText: 'Outstanding environmental record', timespan: '2023' },
        { ratingId: 'R13', ratingName: '2022 Labor Rating', sigId: 'SIG2', sigName: 'California Labor Federation', rating: '85', ratingText: 'Strong labor ally', timespan: '2022' },
        { ratingId: 'R14', ratingName: '2023 Rating', sigId: 'SIG7', sigName: 'California Business Roundtable', rating: '41', ratingText: 'Mixed record on business priorities', timespan: '2023' },
      ],
    },
  },
}

export const MOCK_FEC_SEARCH: Record<string, object> = {
  default: { results: [{ candidate_id: 'H2TX18000' }] },
}

export const MOCK_FEC_TOTALS: Record<string, object> = {
  'H2TX18000': {
    results: [
      { cycle: 2024, receipts: 3_250_000, disbursements: 2_980_000, cash_on_hand_end_period: 820_000, debts_owed_by_committee: 0, individual_contributions: 1_920_000, other_political_committee_contributions: 1_050_000 },
      { cycle: 2022, receipts: 2_870_000, disbursements: 2_650_000, cash_on_hand_end_period: 540_000, debts_owed_by_committee: 0, individual_contributions: 1_640_000, other_political_committee_contributions: 980_000 },
      { cycle: 2020, receipts: 3_100_000, disbursements: 3_050_000, cash_on_hand_end_period: 210_000, debts_owed_by_committee: 0, individual_contributions: 1_850_000, other_political_committee_contributions: 1_020_000 },
    ],
  },
}

export const MOCK_FEC_CONTRIBUTORS: Record<string, object> = {
  'H2TX18000': {
    results: [
      { contributor_name: 'Teachers Union PAC', contribution_receipt_amount: 52_000, contributor_employer: 'National Education Association' },
      { contributor_name: 'Healthcare Workers PAC', contribution_receipt_amount: 48_500, contributor_employer: 'SEIU' },
      { contributor_name: 'Environmental Defense Fund PAC', contribution_receipt_amount: 41_200, contributor_employer: 'EDF' },
      { contributor_name: 'Goldman Sachs PAC', contribution_receipt_amount: 38_000, contributor_employer: 'Goldman Sachs' },
      { contributor_name: 'Comcast NBCUniversal PAC', contribution_receipt_amount: 35_500, contributor_employer: 'Comcast' },
      { contributor_name: 'Emily\'s List PAC', contribution_receipt_amount: 32_000, contributor_employer: 'EMILY\'s List' },
      { contributor_name: 'American Federation of Teachers PAC', contribution_receipt_amount: 28_000, contributor_employer: 'AFT' },
      { contributor_name: 'Google/Alphabet PAC', contribution_receipt_amount: 24_500, contributor_employer: 'Alphabet Inc.' },
    ],
  },
}

export const MOCK_PROPUBLICA_SEARCH: Record<string, object> = {
  default: {
    results: [{ members: [{ member_id: 'S000001' }] }],
  },
}

export const MOCK_PROPUBLICA_BILLS: Record<string, object> = {
  S000001: {
    results: [{
      bills: [
        { bill_id: 'hr1234-118', title: 'To amend the Clean Air Act to establish new emissions standards for industrial facilities', short_title: 'Clean Air Modernization Act', congressdotgov_url: 'https://congress.gov', introduced_date: '2024-01-15', primary_subject: 'Environmental Protection', active: true, latest_major_action: 'Referred to the Subcommittee on Environment', latest_major_action_date: '2024-01-22' },
        { bill_id: 'hr2345-118', title: 'To provide emergency housing assistance to families affected by natural disasters', short_title: 'Disaster Housing Relief Act', congressdotgov_url: 'https://congress.gov', introduced_date: '2023-10-03', primary_subject: 'Housing and Community Development', active: false, latest_major_action: 'Failed passage under suspension of the rules', latest_major_action_date: '2023-11-15' },
        { bill_id: 'hr3456-118', title: 'To expand Medicare coverage to include dental, vision, and hearing benefits', short_title: 'Medicare Dental, Vision, and Hearing Act', congressdotgov_url: 'https://congress.gov', introduced_date: '2023-07-20', primary_subject: 'Health', active: true, latest_major_action: 'Referred to the Committee on Ways and Means', latest_major_action_date: '2023-07-20' },
        { bill_id: 'hr4567-118', title: 'To strengthen the Voting Rights Act and protect access to the ballot', short_title: 'Voting Rights Advancement Act', congressdotgov_url: 'https://congress.gov', introduced_date: '2023-03-08', primary_subject: 'Civil Rights and Liberties', active: false, latest_major_action: 'Motion to proceed rejected', latest_major_action_date: '2023-04-12' },
        { bill_id: 'hr5678-118', title: 'To increase funding for public broadband infrastructure in underserved communities', short_title: 'Rural Broadband Expansion Act', congressdotgov_url: 'https://congress.gov', introduced_date: '2023-02-01', primary_subject: 'Science, Technology, Communications', active: true, latest_major_action: 'Passed House; referred to Senate Commerce Committee', latest_major_action_date: '2023-09-28' },
      ],
    }],
  },
}

export const MOCK_PROPUBLICA_VOTES: Record<string, object> = {
  S000001: {
    results: [{
      votes: [
        { bill: { bill_id: 'hr1234-118', title: 'Infrastructure Investment and Jobs Act' }, date: '2023-11-06', position: 'Yes', result: 'Passed', description: 'On Passage of the Bill' },
        { bill: { bill_id: 'hr2345-118', title: 'Inflation Reduction Act' }, date: '2023-08-12', position: 'Yes', result: 'Passed', description: 'On Passage of the Bill' },
        { bill: { bill_id: 'hr3456-118', title: 'Secure Border Act' }, date: '2024-01-20', position: 'No', result: 'Passed', description: 'On Passage of the Bill' },
        { bill: { bill_id: 'hr4567-118', title: 'NDAA FY2024' }, date: '2023-12-14', position: 'Yes', result: 'Passed', description: 'On Passage of the Bill' },
      ],
    }],
  },
}
