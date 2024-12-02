const workoutData = [
    {
        id: 1,
        title: 'Push-ups',
        details: 'Perform a full push-up with proper form for 30 seconds.',
        image: require('../../assets/workouts/pngs/push-ups.png'),
        gifImage: require('../../assets/workouts/gifs/push-ups.gif'),
        timing: '30 seconds',
        category: 'Strength',
    },
    {
        id: 2,
        title: 'Squats',
        details: 'Perform bodyweight squats with proper form for 45 seconds.',
        image: require('../../assets/workouts/pngs/squat.png'),
        gifImage: require('../../assets/workouts/gifs/squat.gif'),
        timing: '45 seconds',
        category: 'Strength',
    },
    {
        id: 3,
        title: 'Jumping Jacks',
        details: 'Perform jumping jacks for 1 minute.',
        image: require('../../assets/workouts/pngs/jumping-jacks.png'),
        gifImage: require('../../assets/workouts/gifs/jumping-jacks.gif'),
        timing: '60 seconds',
        category: 'Cardio',
    },
    {
        id: 4,
        title: 'Plank',
        details: 'Hold a plank position for 1 minute.',
        image: require('../../assets/workouts/pngs/plank.png'),
        gifImage: require('../../assets/workouts/gifs/plank.gif'),
        timing: '60 seconds',
        category: 'Core',
    },
];

export default workoutData;