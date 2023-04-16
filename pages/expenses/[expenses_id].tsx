import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';
import { ExpensesProps } from '..';
import clientPromise from '@/lib/mongodb';
import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db('expenses_tracker');
    const { id } = context.query;

    const expenses = await db.collection('expenses').findOne({
      _id: id,
    });

    // res.json(expenses);

    return {
      props: { expenses: JSON.parse(JSON.stringify(expenses)) },
    };
  } catch (error) {
    console.error(error);
  }
}

const EditExpenses = ({ expenses }: any) => {
  console.log(expenses, 'sespe');
  const router = useRouter();
  const { expenses_id } = router.query;
  return (
    <div>
      <p>Expenses id: {expenses_id}</p>
    </div>
  );
};

export default EditExpenses;
