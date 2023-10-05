import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

import { IUser } from '../interfaces';

export async function mapUser(
  doc: DocumentSnapshot<unknown, DocumentData>,
  notFound?: 'throw',
): Promise<IUser>;
export async function mapUser(
  doc: DocumentSnapshot<unknown, DocumentData>,
  notFound?: 'null',
): Promise<IUser | null>;
export async function mapUser(
  doc: DocumentSnapshot<unknown, DocumentData>,
  notFound?: 'null' | 'throw',
): Promise<IUser | null> {
  if (!doc.exists()) {
    if (notFound === 'throw') {
      throw new Error('Not Found');
    }
    return null;
  }
  const data = doc.data() as DocumentData;

  return {
    id: doc.id,
    ...data,
  } as IUser;
}
