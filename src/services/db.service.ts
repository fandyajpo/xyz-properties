import { db } from './firebase/config';
import { 
  collection, doc, getDoc, getDocs, 
  query, where, orderBy, setDoc, updateDoc 
} from 'firebase/firestore';
import type { Investor } from '@/types/investor.types';

/**
 * Service for interacting with Firestore.
 * This provides typed access to your Firebase database.
 */
export const dbService = {
  // === INVESTORS ===
  async getInvestorProfile(uid: string): Promise<Investor | null> {
    const docRef = doc(db, 'investors', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Investor;
    }
    return null;
  },

  async createInvestorProfile(uid: string, data: Partial<Investor>): Promise<void> {
    await setDoc(doc(db, 'investors', uid), data, { merge: true });
  },

  // === PORTFOLIO / PROJECTS ===
  async getInvestorProjects(uid: string) {
    const q = query(collection(db, 'investor_projects'), where('investorId', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // === PAYMENTS ===
  async getPayments(uid: string) {
    const q = query(
      collection(db, 'payments'), 
      where('investorId', '==', uid),
      orderBy('dueDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // === DOCUMENTS ===
  async getDocuments(uid: string) {
    const q = query(collection(db, 'documents'), where('investorId', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // === TICKETS ===
  async getSupportTickets(uid: string) {
    const q = query(collection(db, 'support_tickets'), where('investorId', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
