export const mockUsers = [
    // --- Trainees ---
    {
        id: 'trainee1',
        phone: '9876543210',
        role: 'trainee',
        name: 'Anika Sharma',
        tags: ['Beauty'],
        assignedMentorId: 'grad2',
        courseProgress: 2, // 2 out of 5 courses completed
        avatar: '/images/avatars/avatar1.jpg',
        joinDate: '2023-03-15',
        location: 'Mumbai, Maharashtra',
    },
    {
        id: 'trainee2',
        phone: '9876543211',
        role: 'trainee',
        name: 'Suresh Kumar',
        tags: ['Groceries'],
        assignedMentorId: 'grad3',
        courseProgress: 4,
        avatar: '/images/avatars/avatar2.jpg',
        joinDate: '2023-05-20',
        location: 'Ahmedabad, Gujarat',
    },
    {
        id: 'trainee3',
        phone: '9876543212',
        role: 'trainee',
        name: 'Meera Patel',
        tags: ['Furniture'],
        assignedMentorId: 'grad1',
        courseProgress: 1,
        avatar: '/images/avatars/avatar3.jpg',
        joinDate: '2023-07-05',
        location: 'Surat, Gujarat',
    },
    {
        id: 'trainee4',
        phone: '9876543213',
        role: 'trainee',
        name: 'Rahul Gupta',
        tags: ['Beauty'],
        assignedMentorId: null,
        courseProgress: 3,
        avatar: '/images/avatars/avatar4.jpg',
        joinDate: '2023-06-12',
        location: 'Delhi, NCR',
    },
    // --- Graduates ---
    {
        id: 'grad1',
        phone: '8765432109',
        role: 'graduate',
        name: 'Raj Patel',
        tags: ['Furniture', 'Success'],
        mentoring: ['trainee3'],
        followUpStatus: 'Month 34/34',
        successStory: 'I started with a small workshop and now I employ 15 people. The key was understanding supply chain management, which I learned through an ICECD refresher course.',
        avatar: '/images/avatars/avatar5.jpg',
        business: 'Patel Furniture Works',
        joinDate: '2020-01-10',
        location: 'Rajkot, Gujarat',
        metrics: {
            jobsCreated: 15,
            revenue: '₹45,00,000/year',
            sustainabilityDays: 1240
        }
    },
    {
        id: 'grad2',
        phone: '8765432108',
        role: 'graduate',
        name: 'Priya Singh',
        tags: ['Beauty'],
        mentoring: ['trainee1'],
        followUpStatus: 'Month 20/34',
        successStory: null,
        avatar: '/images/avatars/avatar6.jpg',
        business: 'Priya Beauty Salon',
        joinDate: '2022-03-05',
        location: 'Jaipur, Rajasthan',
        metrics: {
            jobsCreated: 3,
            revenue: '₹12,00,000/year',
            sustainabilityDays: 700
        }
    },
    {
        id: 'grad3',
        phone: '8765432107',
        role: 'graduate',
        name: 'Amit Verma',
        tags: ['Groceries', 'Success'],
        mentoring: ['trainee2'],
        followUpStatus: 'Month 40/34',
        successStory: 'My grocery delivery service is now profitable and has expanded to three neighborhoods. The mentorship on digital payments was invaluable.',
        avatar: '/images/avatars/avatar2.jpg',
        business: 'Verma Fresh Groceries',
        joinDate: '2020-05-15',
        location: 'Pune, Maharashtra',
        metrics: {
            jobsCreated: 8,
            revenue: '₹30,00,000/year',
            sustainabilityDays: 1350
        }
    },
    // --- Admin ---
    {
        id: 'admin1',
        phone: '7654321098',
        role: 'admin',
        name: 'Anjali Mehta',
        avatar: '/images/avatars/avatar1.jpg',
        title: 'Program Coordinator',
        joinDate: '2018-01-01',
    },
];