export const mockCommunityPosts = [
    {
        id: 1,
        authorId: 'trainee1',
        authorName: 'Anika Sharma',
        authorRole: 'trainee',
        authorAvatar: '/images/avatars/avatar1.jpg',
        title: 'Need help with financial projections for a skincare line.',
        query: 'I have a good product idea but I am struggling to create realistic financial projections for my business plan. Does anyone have a template or advice on where to start for the beauty industry?',
        sectorTag: 'Beauty',
        createdAt: '2023-07-10T10:15:00Z',
        replies: [
            {
                id: 101,
                authorId: 'grad2',
                authorName: 'Priya Singh',
                authorRole: 'graduate',
                authorAvatar: '/images/avatars/avatar6.jpg',
                text: 'I can help with this! I have experience creating financial projections for my beauty salon. Send me a message and we can discuss the details.',
                createdAt: '2023-07-10T12:30:00Z'
            },
            {
                id: 102,
                authorId: 'admin1',
                authorName: 'Anjali Mehta',
                authorRole: 'admin',
                authorAvatar: '/images/avatars/avatar1.jpg',
                text: 'I have created a group chat for you and Priya to discuss this further. You can find it in your "My Mentor Groups" section.',
                createdAt: '2023-07-10T14:45:00Z'
            }
        ]
    },
    {
        id: 2,
        authorId: 'trainee2',
        authorName: 'Suresh Kumar',
        authorRole: 'trainee',
        authorAvatar: '/images/avatars/avatar2.jpg',
        title: 'Best way to manage fresh produce inventory?',
        query: 'For my grocery business, minimizing waste is key. What are the best practices for managing inventory of fresh fruits and vegetables?',
        sectorTag: 'Groceries',
        createdAt: '2023-07-09T09:20:00Z',
        replies: [
            {
                id: 201,
                authorId: 'grad3',
                authorName: 'Amit Verma',
                authorRole: 'graduate',
                authorAvatar: '/images/avatars/avatar2.jpg',
                text: 'I use a first-in-first-out (FIFO) system for my grocery store. Also, keeping track of which items sell fastest helps a lot. Let\'s connect and I can share my spreadsheet template.',
                createdAt: '2023-07-09T11:05:00Z'
            }
        ]
    },
    {
        id: 3,
        authorId: 'grad1',
        authorName: 'Raj Patel',
        authorRole: 'graduate',
        authorAvatar: '/images/avatars/avatar5.jpg',
        title: 'Sharing a great contact for raw wood suppliers in Gujarat.',
        query: 'For anyone in the furniture business, I have a fantastic and reliable contact for ethically sourced teak wood. Happy to share details in a private chat.',
        sectorTag: 'Furniture',
        createdAt: '2023-07-08T15:45:00Z',
        replies: [
            {
                id: 301,
                authorId: 'trainee3',
                authorName: 'Meera Patel',
                authorRole: 'trainee',
                authorAvatar: '/images/avatars/avatar3.jpg',
                text: 'This would be very helpful for my furniture business! Can you please share the contact details?',
                createdAt: '2023-07-08T16:30:00Z'
            },
            {
                id: 302,
                authorId: 'grad1',
                authorName: 'Raj Patel',
                authorRole: 'graduate',
                authorAvatar: '/images/avatars/avatar5.jpg',
                text: 'Certainly! I\'ve sent you a direct message with the information.',
                createdAt: '2023-07-08T17:15:00Z'
            }
        ]
    },
    {
        id: 4,
        authorId: 'trainee4',
        authorName: 'Rahul Gupta',
        authorRole: 'trainee',
        authorAvatar: '/images/avatars/avatar4.jpg',
        title: 'Looking for low-cost marketing ideas for beauty products',
        query: 'I\'m starting a small line of herbal face packs and need ideas for marketing with almost no budget. How can I reach potential customers without spending much?',
        sectorTag: 'Beauty',
        createdAt: '2023-07-07T13:10:00Z',
        replies: []
    }
];