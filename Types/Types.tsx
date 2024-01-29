export type DISTANCE = {
    'MILES': string | undefined;
    'KMS': string | undefined;
    'METRES': string | undefined;
    'END_ON_DISTANCE' : boolean | null; //true = end when distance is over, false = end when timer is over
};

export type TIME = {
    'HOURS': string | undefined;
    'MINS': string | undefined;
    'SECS': string | undefined;
};

export enum SPEED { 
    WALK, 
    JOG , 
    SPRINT, 
    'SELECT SPEED'
};

export enum IntervalCombination {
    SPEED_TIME = 'SPEED_TIME',
    SPEED_DISTANCE = 'SPEED_DISTANCE',
    DISTANCE_TIME = 'DISTANCE_TIME'
};

export interface IRunIntervalsData {
    id?: string;
    readonly value: 1 | 2;
    color: Array<string>;
    'DISTANCE' ?: DISTANCE;
    'SPEED' ?: SPEED;
    'TIME' ?: TIME;
    intervalType ?: IntervalCombination;
    speak?: string
};

export type Option = 'TIME' | 'SPEED' | 'DISTANCE';

export interface IOptions {
    overlay: boolean | undefined;
    option: string | undefined;
    optionColor: string;
};