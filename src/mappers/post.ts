import {
  DocumentData,
  DocumentSnapshot,
  getDoc,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import _ from 'lodash';

import { IPost } from '../interfaces';
import { mapUser } from './user';

export async function mapPost(
  doc: DocumentSnapshot<unknown, DocumentData>,
  notFound?: 'throw',
): Promise<IPost>;
export async function mapPost(
  doc: DocumentSnapshot<unknown, DocumentData>,
  notFound?: 'null',
): Promise<IPost | null>;
export async function mapPost(
  doc: DocumentSnapshot<unknown, DocumentData>,
  notFound?: 'null' | 'throw',
): Promise<IPost | null> {
  if (!doc.exists()) {
    if (notFound === 'throw') {
      throw new Error('Not Found');
    }
    return null;
  }
  const data = doc.data() as DocumentData;

  return {
    id: doc.id,
    description: data.description,
    publishedAt: data.publishedAt?.toDate(),
    owner: await getDoc(data.ownerRef).then(async (doc) => mapUser(doc)),
    medias: data.medias,
  } as IPost;
}

export async function mapPosts(
  docs: Array<QueryDocumentSnapshot<unknown, DocumentData>>,
) {
  return Promise.all(_.map(docs, async (doc) => mapPost(doc, 'throw')));
}
