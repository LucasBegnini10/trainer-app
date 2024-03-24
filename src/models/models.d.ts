export interface UserModel {
  id: string;
  name: string;
  document: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  Students:   Student | null;
  Trainers:   Trainer | null;
}

export interface Trainer {
  trainer_id: string;
  user_id:    string;
}

export interface Student {
  student_id: string;
  user_id:    string;
}


export interface TrainerStudentsModel {
  trainer_id: string;
  student_id: string;
  created_at: string;
}

export interface ExercisesModel {
  id: number;
  name: string;
  description: string;
  video_url: string;
  trainer_id: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutExercisesModel {
  id: number;
  exercise_id: number;
  workout_id: number;
}

export interface WorkoutModel {
  id: number;
  name: string;
  description: string;
  schedule_description: number[];
  logo_url: string;
  trainer_id: string;
  student_id: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutTrackerModel {
  id: number;
  status: StatusWorkoutTracker;
  tired_level: number | null;
  feedback: string | null;
  time_started: string | null;
  time_finished: string | null;
  trainer_id: string;
  student_id: string;
}

export enum StatusWorkoutTracker {
  DONE = "DONE",
  PROCESSING = "PROCESSING"  
}
