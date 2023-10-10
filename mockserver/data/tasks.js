module.exports = {
  content: [
    { id: '1', path: 'Lorem Ipsum.pdf', mimeType: 'application/pdf' },
    {
      id: '2',
      path: 'Get Started With Smallpdf.pdf',
      mimeType: 'application/pdf',
    },
  ],
  tasks: {
    user1: [
      {
        id: '1b06ea6080000902',
        stage: 'acquired',
        title: 'Sample Document 1.docx',
        author: 'user1',
        body: 'Ознакомиться с документом.',
        dateSent: 'March 15 2023 14:00',
        priority: 'high',
        content: [{ id: 1 }, { id: 2 }],
        dueDate: 'March 15 2023 14:00',
      },
      {
        id: '1b06ea6080000903',
        stage: 'acquired',
        title: 'Sample Document 2.docx',
        author: 'user1',
        body: 'Ознакомиться с документом.',
        dateSent: 'September 18 2023 14:00',
        priority: 'high',
        content: [{ id: 1 }],
        dueDate: 'September 20 2023 14:00',
      },
      {
        id: '1b06ea6080000904',
        stage: 'acquired',
        title: 'Sample Document 3.docx',
        author: 'user1',
        body: 'Ознакомиться с документом.',
        dateSent: 'October 1 2023 14:00',
        priority: 'high',
        content: [{ id: 2 }],
        dueDate: 'October 31 2023 14:00',
      },
    ],
    user2: [
      {
        id: '1b06ea6080000905',
        stage: 'acquired',
        title: 'Sample Document 4.docx',
        author: 'user1',
        body: 'Ознакомиться с документом.',
        dateSent: 'April 15 2023 14:00',
        priority: 'high',
        content: [],
        dueDate: 'April 15 2023 14:00',
      },
      {
        id: '1b06ea6080000906',
        stage: 'acquired',
        title: 'Sample Document 5.docx',
        author: 'user1',
        body: 'Ознакомиться с документом.',
        dateSent: 'September 1 2023 14:00',
        priority: 'high',
        content: [],
        dueDate: 'September 20 2023 14:00',
      },
      {
        id: '1b06ea6080000907',
        stage: 'acquired',
        title: 'Sample Document 6.docx',
        author: 'user1',
        body: 'Ознакомиться с документом.',
        dateSent: 'October 3 2023 14:00',
        priority: 'high',
        content: [],
        dueDate: 'October 31 2023 14:00',
      },
    ],
  },
};
