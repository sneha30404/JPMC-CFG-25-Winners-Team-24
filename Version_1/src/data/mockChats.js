export const mockChats = [
    {
        id: 'chat1',
        name: 'Mentorship: Anika & Priya',
        members: ['trainee1', 'grad2', 'admin1'],
        createdAt: '2023-07-10T15:00:00Z',
        messages: [
            {
                id: 'msg1',
                senderId: 'admin1',
                sender: 'Anjali Mehta',
                text: 'Welcome Anika and Priya! Priya, Anika had a query about business plans in the beauty sector. Thought you would be the perfect mentor!',
                timestamp: '2023-07-10T15:00:00Z'
            },
            {
                id: 'msg2',
                senderId: 'grad2',
                sender: 'Priya Singh',
                text: 'Of course! Happy to help, Anika. Let me know your specific questions.',
                timestamp: '2023-07-10T15:05:00Z'
            },
            {
                id: 'msg3',
                senderId: 'trainee1',
                sender: 'Anika Sharma',
                text: 'Thank you! I\'m struggling with estimating startup costs and projecting revenue for my skincare line.',
                timestamp: '2023-07-10T15:10:00Z'
            },
            {
                id: 'msg4',
                senderId: 'grad2',
                sender: 'Priya Singh',
                text: 'I understand. Let\'s break it down step by step. First, let\'s list all the equipment and supplies you\'ll need.',
                timestamp: '2023-07-10T15:15:00Z'
            }
        ]
    },
    {
        id: 'chat2',
        name: 'Groceries Cohort Q&A',
        members: ['trainee2', 'grad3', 'admin1'],
        createdAt: '2023-07-09T12:00:00Z',
        messages: [
            {
                id: 'msg5',
                senderId: 'admin1',
                sender: 'Anjali Mehta',
                text: 'This is the group for our grocery sector members. Feel free to discuss challenges and successes here.',
                timestamp: '2023-07-09T12:00:00Z'
            },
            {
                id: 'msg6',
                senderId: 'trainee2',
                sender: 'Suresh Kumar',
                text: 'Thank you for creating this group! Amit, I\'d love to learn more about your inventory management system.',
                timestamp: '2023-07-09T12:30:00Z'
            },
            {
                id: 'msg7',
                senderId: 'grad3',
                sender: 'Amit Verma',
                text: 'Happy to share! I\'ll create a simple template and send it here later today.',
                timestamp: '2023-07-09T13:15:00Z'
            }
        ]
    },
    {
        id: 'chat3',
        name: 'Furniture Business Support',
        members: ['trainee3', 'grad1', 'admin1'],
        createdAt: '2023-07-08T18:00:00Z',
        messages: [
            {
                id: 'msg8',
                senderId: 'admin1',
                sender: 'Anjali Mehta',
                text: 'Welcome to the Furniture Business Support group! Raj has agreed to mentor Meera on furniture business operations.',
                timestamp: '2023-07-08T18:00:00Z'
            },
            {
                id: 'msg9',
                senderId: 'grad1',
                sender: 'Raj Patel',
                text: 'Hi Meera! I\'ve been in the furniture business for over 3 years now. Happy to share my experiences and contacts.',
                timestamp: '2023-07-08T18:10:00Z'
            },
            {
                id: 'msg10',
                senderId: 'trainee3',
                sender: 'Meera Patel',
                text: 'Thank you, Raj! I\'m just starting out and would love to learn about sourcing quality materials at reasonable prices.',
                timestamp: '2023-07-08T18:15:00Z'
            }
        ]
    }
];