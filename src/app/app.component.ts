import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  transactions: any[] = [];
  transaction:any = { amount: null, category: '', date: '' };
  totalIncome = 0;
  totalExpenses = 0;
  balance = 0;
  editIndex: number | null = null;

  addTransaction() {
    if (this.editIndex !== null) {

      const originalTransaction = this.transactions[this.editIndex];

  
      if (originalTransaction.category === 'Income') {
        this.totalIncome -= originalTransaction.amount;
      } else if (originalTransaction.category === 'Expense') {
        this.totalExpenses -= originalTransaction.amount;
      }

    
      if (this.transaction.category === 'Income') {
        this.totalIncome += this.transaction.amount;
      } else if (this.transaction.category === 'Expense') {
        this.totalExpenses += this.transaction.amount;
      }

    
      this.transactions[this.editIndex] = { ...this.transaction };

      this.editIndex = null; 
    } else {
      // Add a new transaction
      if (this.transaction.category === 'Income') {
        this.totalIncome += this.transaction.amount;
      } else if (this.transaction.category === 'Expense') {
        this.totalExpenses += this.transaction.amount;
      }

      this.transactions.push({ ...this.transaction });
    }

    this.balance = this.totalIncome - this.totalExpenses;
    this.transaction = { amount: null, category: '', date: '' }; 
  }

  editTransaction(index: number) {
    this.editIndex = index; 
    this.transaction = { ...this.transactions[index] }; 
  }

  deleteTransaction(index: number) {
    const trans = this.transactions[index];
    if (trans.category === 'Income') {
      this.totalIncome -= trans.amount;
    } else if (trans.category === 'Expense') {
      this.totalExpenses -= trans.amount;
    }
    this.balance = this.totalIncome - this.totalExpenses;

    this.transactions.splice(index, 1);
  }
}

