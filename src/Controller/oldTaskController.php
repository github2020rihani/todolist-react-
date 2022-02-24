<?php
//
//
//namespace App\Controller;
//
//
//use App\Entity\Task;
//use App\Repository\TaskRepository;
//use Doctrine\ORM\EntityManagerInterface;
//use Symfony\Component\HttpFoundation\Request;
//
//class oldTaskController
//{
//    /**
//     * @var EntityManagerInterface
//     */
//    private $em ;
//    /**
//     * @var TaskRepository
//     */
//    private $taskRepository ;
//
//    /**
//     * TaskController constructor.
//     * @param EntityManagerInterface $em
//     * @param TaskRepository $taskRepository
//     */
//    public function __construct(EntityManagerInterface $em,
//                                TaskRepository $taskRepository)
//    {
//        $this->em = $em ;
//        $this->taskRepository = $taskRepository ;
//
//
//    }
//
//    /**
//     * @Route("/read", name="api_task_read", methods={"GET"})
//     */
//    public function index()
//    {
//        $tasks = $this->taskRepository->findAll();
//        $arrayOfTask = [];
//        foreach ($tasks as $t ) {
//            $arrayOfTask[] = $t->toArray();
//        }
//        return $this->json($arrayOfTask);
//
//    }
//
//    /**
//     * @param Request $request
//     * @Route("/create", name="api_task_create", methods={"POST"})
//     */
//    public function create(Request $request) {
//        $content = json_decode($request->getContent());
//        $task = new Task();
//        $task->setName($content->name);
//        $task->setDescription($content->description);
//        try{
//            $this->em->persist($task);
//            $this->em->flush();
//        }catch(\Exception $e) {
//            return $this->json([
//                'message' => ['text'=>'Could not submit'  , 'level' => 'error']
//            ]) ;
//        }
//
//        return $this->json([
//            'todo' => $task->toArray(),
//            'message' => ['text'=>['task created' , ' Task: ' .$content->name] , 'level' => 'success']
//        ]);
//    }
//
//    /**
//     * @param Request $request
//     * @param Task $task
//     * @return \Symfony\Component\HttpFoundation\JsonResponse
//     * @Route("/update/{id}", name="api_task_update", methods={"PUT"})
//     */
//    public function update(Request $request, Task $task) {
//
//        $task = $this->taskRepository->find($task);
//        $content = json_decode($request->getContent());
//        if ($task->getName() === $content->name && $task->getDescription() === $content->description ) {
//            return $this->json([
//                'message' => ['text'=>'Aucun changed'  , 'level' => 'error']
//            ]) ;
//        }
//
//        if ($task) {
//            $task->setName($content->name);
//            $task->setDescription($content->description);
//
//        }
//        try{
//            $this->em->persist($task);
//            $this->em->flush();
//        }catch(\Exception $e) {
//            return $this->json([
//                'message' => ['text'=>'Could not submit'  , 'level' => 'error']
//            ]) ;
//        }
//        return $this->json([
//            'todo' => $task->toArray(),
//            'message' => ['text'=>'task updated' , 'level' => 'success']
//        ]);
//
//    }
//
//    /**
//     * @param Task $task
//     * @Route("/delete/{id}", name="api_task_delete", methods={"DELETE"})
//
//     */
//    public function delete(Task $task) {
//        try {
//            $this->em->remove($task);
//            $this->em->flush();
//        }catch (\Exception $e) {
//            return $this->json([
//                'message' => ['text'=>'error of deleted', 'level' => 'error']
//            ]);
//        }
//        return $this->json([
//            'message' => ['text'=>'task deleted', 'level' => 'success']
//
//        ]);
//    }
//}