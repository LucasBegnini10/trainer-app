export interface UserModel {
  id: string;
  name: string;
  document: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface TrainerModel extends Usermodel {}

export interface StudentModel extends Usermodel {}

export interface TrainerStudentsModel {
  trainer_id: string;
  student_id: string;
  created_at: Date;
}

export interface ExercisesModel {
  id: number;
  name: string;
  description: string;
  video_url: string;
  trainer_id: string;
  created_at: Date;
  updated_at: Date;
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
  schedule_description: string;
  logo_url: string;
  trainer_id: string;
  student_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface WorkoutTrackerModel {
  id: number;
  status: StatusWorkoutTracker;
  tired_level: number | null;
  feedback: string | null;
  time_started: Date | null;
  time_finished: Date | null;
  trainer_id: string;
  student_id: string;
}

export enum StatusWorkoutTracker {
  DONE = "DONE",
  PROCESSING = "PROCESSING"  
}
