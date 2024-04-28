export interface UserModel {
  id: string;
  name: string;
  document: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  Students: Student | null;
  Trainers: Trainer | null;
}

export interface Trainer {
  trainer_id: string;
  user_id: UserModel["id"];
}

export interface Student {
  student_id: string;
  user_id: UserModel["id"];
}

export interface TrainerStudentsModel {
  trainer_id: Trainer["trainer_id"];
  student_id: Student["student_id"];
  created_at: string;
}

export interface WorkoutModel {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  trainer_id: Trainer["trainer_id"];
  created_at: string;
  updated_at: string;
}

export interface WorkoutDetailsModel extends WorkoutModel {
  exercises: ExercisesModel[];
  students: Student[];
}

export interface ExercisesModel {
  id: number;
  name: string;
  description: string;
  video_url: string;
  trainer_id: Trainer["trainer_id"];
  created_at: string;
  updated_at: string;
}

export interface WorkoutExercisesModel {
  id: number;
  exercise_id: ExercisesModel["id"];
  workout_id: WorkoutModel["id"];
}

export interface WorkoutStudentsModel {
  id: number;
  student_id: Student["student_id"];
  workout_id: WorkoutModel["id"];
  schedule_description: number[];
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
  PROCESSING = "PROCESSING",
}
