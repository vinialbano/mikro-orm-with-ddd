import { MikroORM, SqliteDriver } from '@mikro-orm/sqlite';
import { Lecture } from '../src/lectures/domain/entities/lecture.entity';
import { Professor } from '../src/lectures/domain/entities/professor.entity';
import {
  LectureSchema,
  PeriodSchema,
  ProfessorSchema,
} from '../src/lectures/infra/db/schemas';

describe('Schemas Unit Tests', () => {
  let orm: MikroORM;
  beforeAll(async () => {
    orm = await MikroORM.init<SqliteDriver>({
      entities: [LectureSchema, ProfessorSchema, PeriodSchema],
      dbName: ':memory:',
      driver: SqliteDriver,
      forceEntityConstructor: true,
    });
  });

  afterAll(async () => {
    await orm.close();
  });

  it('should create the required entities', async () => {
    await orm.schema.refreshDatabase();
    const em = orm.em.fork();

    const professor = Professor.create({ name: 'John Doe' });
    em.persist(professor);

    const lecture = Lecture.create({
      professorId: professor.id,
      title: 'Databases 101',
    });
    em.persist(lecture);

    await em.flush();
    await em.clear();

    const insertedLecture = await em.findOne(Lecture, { id: lecture.id });
    console.log('before start', insertedLecture);

    insertedLecture!.start();
    console.log('after start', insertedLecture);
    await em.flush();
    await em.clear();

    const updatedLecture = await em.findOne(Lecture, { id: lecture.id });
    console.log('retrieved after start', updatedLecture);
    expect(updatedLecture?.period?.start).toEqual(insertedLecture?.period.start);
    expect(updatedLecture?.period?.end).toEqual(insertedLecture?.period.end);
  });
});
