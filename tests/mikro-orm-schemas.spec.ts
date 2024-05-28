import { MikroORM, SqliteDriver } from '@mikro-orm/sqlite';
import { Lecture } from '../src/domain-entities/lecture.entity';
import { LectureSchema, PeriodSchema } from '../src/mikro-orm-schemas';

describe('Schemas Unit Tests', () => {
  let orm: MikroORM;
  beforeAll(async () => {
    orm = await MikroORM.init({
      entities: [LectureSchema, PeriodSchema],
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

    const lecture = Lecture.create({
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
    expect(updatedLecture?.period?.start).toEqual(
      insertedLecture!.period!.start,
    );
    expect(updatedLecture?.period?.end).toEqual(insertedLecture!.period!.end);
  });

  it('should retrieve the raw schema using query builder', async () => {
    await orm.schema.refreshDatabase();
    const em = orm.em.fork();

    const lecture = Lecture.create({
      title: 'Databases 101',
    });
    lecture.start();
    lecture.end();
    em.persist(lecture);
    await em.flush();
    await em.clear();

    const qb = em.createQueryBuilder('Lecture');

    const results = await qb
      .select(['*'])
      .where({ title: 'Databases 101' })
      .execute('all', false);

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      id: lecture.id.id,
      title: 'Databases 101',
      period_start: lecture.period!.start.getTime(),
      period_end: lecture.period!.end?.getTime(),
      interval_start: null,
      interval_end: null,
    });
  });

  it('should retrieve the mapped schema using query builder', async () => {
    await orm.schema.refreshDatabase();
    const em = orm.em.fork();

    const lecture = Lecture.create({
      title: 'Databases 101',
    });
    lecture.setInterval({
      start: new Date(),
      end: new Date(),
    });
    lecture.start();
    lecture.end();
    em.persist(lecture);
    await em.flush();
    await em.clear();

    const qb = em.createQueryBuilder('Lecture');

    const results = await qb
      .select(['*'])
      .where({ title: 'Databases 101' })
      .execute('all', true);

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      id: lecture.id.id,
      title: 'Databases 101',
      period: {
        start: lecture.period!.start,
        end: lecture.period!.end,
      },
      interval: null,
    });
  });
});
