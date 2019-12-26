export default {
    name: {
        elmType: 'text', value: '',
        config: { label: 'שם המערכון' },
        validation: { required: true }, valid: false, touched: false,
    },
    youtube_id: {
        elmType: 'text', value: '',
        config: { label: 'מזהה Youtube' },
        validation: { required: true }, valid: false, touched: false,
    },
    season: {
        elmType: 'number', value: '',
        config: { label: 'עונה', min: 1, step: 1, max: 4 },
        validation: { required: true }, valid: false, touched: false
    },
    episode: {
        elmType: 'number', value: '',
        config: { label: 'פרק', min: 1, step: 1, max: 18 },
        validation: { required: true }, valid: false, touched: false
    },
    cast: {
        elmType: 'multiselect', value: [],
        config: { label: 'משתתפים', title: 'בחר שחקנים', options: [] },  
        validation: { atLeast: 1 }, valid: false, touched: false
    }
}