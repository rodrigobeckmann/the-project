type Script = {
    movType: 'run' | 'jumpIn' | 'jumpOut' | 'finish' | 'turn',
    distance: number,
}

const script: Script[] = [
    {
        movType: 'run',
        distance: 30,
    },
    {
        movType: 'turn',
        distance: 0,
    },
    {
        movType: 'run',
        distance: 30,
    },
    {
        movType: 'turn',
        distance: 0,
    },
    {
        movType: 'run',
        distance: 30,
    },
    {
        movType: 'jumpIn',
        distance: 60,
    },
    {
        movType: 'jumpOut',
        distance: 20,
    },
    {
        movType: 'turn',
        distance: 0,
    },
    {
        movType: 'finish',
        distance: 0,
    },


]

export default script;