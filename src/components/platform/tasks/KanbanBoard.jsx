import { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { AnimatePresence, motion } from 'framer-motion';
import { format, isPast, differenceInDays } from 'date-fns';
import { MoreVertical, Pencil, Trash2, AlertCircle } from 'lucide-react';
import * as S from './KanbanBoard.styles';
import { DashSearchInput, TableHeader } from '@/components/common/Common.styles';

const STATUSES = ['A Faire', 'En Cours', 'Terminé'];
const STATUS_LABELS = {
  ['A Faire']: 'A Faire',
  ['En Cours']: 'En Cours',
  ['Terminé']: 'Terminé',
};
const STATUS_COLORS = {
  ['A Faire']: 'gray',
  ['En cours']: 'blue',
  // review: 'orange',
  ['Terminé']: 'green',
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export default function KanbanBoard({
  tasks = [],
  onTaskMove,
  onDelete,
  onEdit,
  isLoading,
  onSearch,
  additionalToolbarButtons
}) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [term, setTerm] = useState('');

  // Sync local state when tasks prop changes (e.g., after refetch)
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Group tasks by status
  const columns = useMemo(() => {
    const grouped = {};
    STATUSES.forEach((status) => {
      grouped[status] = localTasks.filter((task) => task.status === status);
    });
    return grouped;
  }, [localTasks]);

  const handleSearch = useCallback(
    (value) => {
      setTerm(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const handleDragEnd = useCallback(
    async (result) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const updated = [...localTasks];

      const movedTaskIndex = updated.findIndex(
        (t) => String(t._id) === draggableId
      );

      if (movedTaskIndex === -1) return;

      const movedTask = {
        ...updated[movedTaskIndex],
        status: destination.droppableId,
      };

      updated.splice(movedTaskIndex, 1);

      const destinationTasks = updated.filter(
        (t) => t.status === destination.droppableId
      );

      const insertAt =
        updated.findIndex(
          (t) =>
            t.status === destination.droppableId &&
            destinationTasks.indexOf(t) === destination.index
        );

      if (insertAt === -1) {
        updated.push(movedTask);
      } else {
        updated.splice(insertAt, 0, movedTask);
      }

      setLocalTasks(updated);

      try {
        await onTaskMove(
          draggableId,
          destination.droppableId,
          destination.index
        );
      } catch {
        setLocalTasks(tasks);
      }
    },
    [localTasks, onTaskMove, tasks]
  );

  const renderAssignees = (assignees = []) => {
    if (!assignees.length) {
      return <S.Unassigned>Non assigné</S.Unassigned>;
    }

    const visible = assignees.slice(0, 3);
    const remaining = assignees.length - 3;

    return (
      <S.AssigneeGroup>
        {visible.map((employee, index) => (
          <S.AssigneeAvatar
            key={employee._id || index}
            title={`${employee.firstName} ${employee.lastName}`}
          >
            {employee.firstName?.[0]}
            {employee.lastName?.[0]}
          </S.AssigneeAvatar>
        ))}

        {remaining > 0 && (
          <S.RemainingUsers>
            +{remaining}
          </S.RemainingUsers>
        )}
      </S.AssigneeGroup>
    );
  };

  if (isLoading) {
    return <S.LoadingState>Loading board...</S.LoadingState>;
  }

  return (
    <>
      <TableHeader $mb="1rem">
        <DashSearchInput
          placeholder="Rechercher..."
          value={term}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="btn__container">
          {additionalToolbarButtons}
        </div>
      </TableHeader>
      <DragDropContext onDragEnd={handleDragEnd}>
        <S.BoardContainer>
          {STATUSES.map((status) => (
            <S.Column key={status} color={STATUS_COLORS[status]}>
              <S.ColumnHeader color={STATUS_COLORS[status]}>
                <S.ColumnTitle>{STATUS_LABELS[status]}</S.ColumnTitle>
                <S.TaskCount>{columns[status].length}</S.TaskCount>
              </S.ColumnHeader>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <S.TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver ? "true" : "false"}
                  >
                    <AnimatePresence>
                      {columns[status].length === 0 && (
                        <S.EmptyColumn>
                          Déposez une tâche ici
                        </S.EmptyColumn>
                      )}
                      {columns[status].map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={String(task._id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <S.Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={provided.draggableProps.style}
                              $isDragging={snapshot.isDragging ? "true" : "false"}
                              status={task.status}
                            >
                              <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.15 }}
                                layout
                              >
                                <S.CardHeader>
                                  <S.CardTitle>{task.title}</S.CardTitle>

                                  <S.Actions>
                                    <S.ActionBtn
                                      onClick={() => onEdit(task)}
                                      title="Modifier"
                                    >
                                      <Pencil size={14} />
                                    </S.ActionBtn>

                                    <S.ActionBtn
                                      danger={"true"}
                                      onClick={() => onDelete(task.id)}
                                      title="Supprimer"
                                    >
                                      <Trash2 size={14} />
                                    </S.ActionBtn>
                                  </S.Actions>
                                </S.CardHeader>

                                {task.description && (
                                  <S.CardDescription>
                                    {task.description}
                                  </S.CardDescription>
                                )}

                                <S.CardMeta>
                                  {task.priority && (
                                    <S.PriorityBadge priority={task.priority}>
                                      {task.priority}
                                    </S.PriorityBadge>
                                  )}

                                  {task.dueDate && (
                                    <S.DueDate
                                      overdue={
                                        (isPast(new Date(task.dueDate)) &&
                                        task.status !== 'Terminé') ? "true" : "false"
                                      }
                                    >
                                      {format(new Date(task.dueDate), 'MMM dd')}
                                    </S.DueDate>
                                  )}
                                </S.CardMeta>

                                <S.CardFooter>
                                  <S.Assignees>
                                    {renderAssignees(task.assignedTo)}
                                  </S.Assignees>
                                </S.CardFooter>
                              </motion.div>
                            </S.Card>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                  </S.TaskList>
                )}
              </Droppable>
            </S.Column>
          ))}
        </S.BoardContainer>
      </DragDropContext>
    </>
  );
}