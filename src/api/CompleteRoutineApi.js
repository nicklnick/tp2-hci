
import { RoutineApi } from "@/api/routine.js";
import { RoutineCycleApi } from "@/api/routineCycle";
import { CycleExerciseApi } from "@/api/cycleExercise";

export { CompleteRoutine, CompleteCycle, CompleteExercise, CompleteRoutineApi }

class CompleteRoutineApi{
     static async getCompleteRoutine(routine_id) {
       const routineJson = await RoutineApi.get(routine_id)
       const complete_routine = new CompleteRoutine().build(routineJson)
       const cylceJson = await RoutineCycleApi.getAllCyclesInRoutine(complete_routine.routine_id)

       for(const cylcleKey in cylceJson.content){
          complete_routine.cycles.push(new CompleteCycle().build(cylceJson.content[cylcleKey]))    // cycleJson

          const exerciseJson = await CycleExerciseApi.getAllExercisesInCycle(complete_routine.cycles[cylcleKey].cycle_id);
          for(const exerKey in exerciseJson.content){
              complete_routine.cycles[cylcleKey].exercises.push( new CompleteExercise().build(exerciseJson.content[exerKey]))
          }
       }
       return complete_routine;
     }
     static async createCompleteRoutine(completeRoutine){
       const routineJson =  await RoutineApi.add(completeRoutine.to_simple_routine());  // TODO: posible error no le paso el id y qcy
       completeRoutine.routine_id = routineJson.id;

       let order = 0;
       for(const cycleKey in completeRoutine.cycles){
          order += 1;
          completeRoutine.cycles[cycleKey].order = order;
          completeRoutine.cycles[cycleKey].repetitions = parseInt(completeRoutine.cycles[cycleKey].repetitions)

         const cycleJson = await RoutineCycleApi.add(completeRoutine.routine_id, completeRoutine.cycles[cycleKey].to_simple_cylce());
         completeRoutine.cycles[cycleKey].cycle_id = cycleJson.id;

         let exerOrder = 0;
         for(const exerKey in completeRoutine.cycles[cycleKey].exercises){
            exerOrder += 1;
            completeRoutine.cycles[cycleKey].exercises[exerKey].order = exerOrder;
            completeRoutine.cycles[cycleKey].exercises[exerKey].repetitions = parseInt(completeRoutine.cycles[cycleKey].exercises[exerKey].repetitions);
            completeRoutine.cycles[cycleKey].exercises[exerKey].duration = parseInt(completeRoutine.cycles[cycleKey].exercises[exerKey].duration);

            await CycleExerciseApi.add(completeRoutine.cycles[cycleKey].cycle_id, completeRoutine.cycles[cycleKey].exercises[exerKey].exercise_id,
              completeRoutine.cycles[cycleKey].exercises[exerKey].to_simple_exercise())
         }
       }
     }
}


class CompleteExercise{
  exercise_id;
  exercise_name;
  exercise_detail;
  exercise_order;
  exericse_duration;
  exercise_repetitions;

  constructor(id, name,detail) {
    this.exercise_id = id;
    this.exercise_name = name;
    this.exercise_detail = detail;
  }

  build(exerciseCylceJson){
    this.exercise_id = exerciseCylceJson.exercise.id;
    this.exercise_name = exerciseCylceJson.exercise.name;
    this.exercise_detail = exerciseCylceJson.exercise.detail;
    this.exercise_order = exerciseCylceJson.order;
    this.exericse_duration = exerciseCylceJson.duration;
    this.exercise_repetitions = exerciseCylceJson.repetitions;
    return this
  }
  to_simple_exercise(){
      return {"order": this.exercise_order, "duration":this.exericse_duration, "repetitions":this.exercise_repetitions};
  }
}

class CompleteCycle {
  cycle_id;
  cycle_name;
  cycle_detail;
  cycle_type;
  cycle_order;
  cycle_repetitions;

  exercises = []

  // datos que necesito para mandar el pedido de CREACION
  constructor(name,detail,type) {
    this.cycle_name = name;
    this.cycle_detail = detail;
    this.cycle_type = type;
  }
  build(cycleJson){
    this.cycle_id = cycleJson.id;
    this.cycle_name = cycleJson.name;
    this.cycle_detail = cycleJson.detail;
    this.cycle_type = cycleJson.type;
    this.cycle_order = cycleJson.order;
    this.cycle_repetitions = cycleJson.repetitions;
    return this;
  }
  add_exercise(exercise){
    this.exercises.push(exercise);
  }
  remove_exercise(index){
    this.exercises.splice(index,1);
  }
  to_simple_cylce(){
    return {"name": this.cycle_name, "detail":this.cycle_detail, "type":this.cycle_type,
    "order":this.cycle_order, "repetitions":this.cycle_repetitions}
  }
}

class CompleteRoutine{
    routine_id;

    routine_name;
    routine_detail;
    routine_is_public;
    routine_difficulty;
    routine_category;

    cycles = [];
    cycle_counter = 1;


    // datos que necesito para mandar el pedido de CREACION
    constructor(name, detail, is_public, difficulty, category){
      this.routine_name = name;
      this.routine_detail = detail;
      this.routine_is_public = is_public;
      this.routine_difficulty = difficulty;
      this.routine_category = category;

      this.cycles = [
        new CompleteCycle("Warmup","","warmup"),
        new CompleteCycle("Cycle 1","","exercise" ),
        new CompleteCycle("Cooldown","","cooldown")
      ]
    }
    build(routineJson){
      this.routine_id = routineJson.id;
      this.routine_name = routineJson.name;
      this.routine_detail = routineJson.detail;
      this.routine_category = routineJson.category;
      this.routine_is_public = routineJson.isPublic;
      this.routine_difficulty = routineJson.difficulty;
      this.cycles = [];
      return this;
    }
    addCycle() {
      this.cycle_counter += 1;
      this.cycles.splice(this.cycles.length -1,0,
        new CompleteCycle("Cycle " + this.cycle_counter, "","exercise"));
    }
    removeCycle(index){
      if(this.cycles.length > 1) {
        const resp = index === this.cycles.length - 1 ? index - 1 : index + 1;
        this.cycles.splice(index, 1);

        // retorna a que posicion se deberia cambiar el index del ciclo mostrado
        return resp;
      }
    }
    to_simple_routine(){
      return {"name": this.routine_name, "detail":this.routine_detail, "isPublic":this.routine_is_public,
        "difficulty": this.routine_difficulty, "category": this.routine_category}
    }
}