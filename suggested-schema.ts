import { pgTable, serial, text, integer, decimal, date, timestamp, primaryKey, varchar, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Table for positions
export const positions = pgTable('positions', {
  hh_id: text('hh_id').notNull(),
  date_of_date: integer('date_of_date').notNull(),
  account_id: integer('account_id').notNull(),
  account_name: text('account_name').notNull(),
  symbol: text('symbol').notNull(),
  description: timestamp('description').notNull(),
  _of_units: decimal('_of_units', { precision: 10, scale: 2 }).notNull(),
  cost_price: decimal('cost_price', { precision: 10, scale: 2 }).notNull(),
  position_cost_basis: decimal('position_cost_basis', { precision: 10, scale: 2 }).notNull(),
  close_price: decimal('close_price', { precision: 10, scale: 2 }).notNull(),
  position_market_value: decimal('position_market_value', { precision: 10, scale: 2 }).notNull(),
  position_income_since_inception: text('position_income_since_inception').notNull(),
  position_unrealized_gl: decimal('position_unrealized_gl', { precision: 10, scale: 2 }).notNull(),
  asset_class: text('asset_class').notNull(),
  classification: text('classification').notNull(),
});

// Table for hhflows
export const hhflows = pgTable('hhflows', {
  hh_id: text('hh_id').notNull(),
  household_name: text('household_name').notNull(),
  attribute: text('attribute').notNull(),
  1_month: decimal('1_month', { precision: 10, scale: 2 }).notNull(),
  3_months: decimal('3_months', { precision: 10, scale: 2 }).notNull(),
  ytd: decimal('ytd', { precision: 10, scale: 2 }).notNull(),
  1_year: decimal('1_year', { precision: 10, scale: 2 }).notNull(),
  3_years: decimal('3_years', { precision: 10, scale: 2 }).notNull(),
  5_years: decimal('5_years', { precision: 10, scale: 2 }).notNull(),
  10_years: text('10_years').notNull(),
  inception: decimal('inception', { precision: 10, scale: 2 }).notNull(),
  sort_index: integer('sort_index').notNull(),
});

// Table for accounts
export const accounts = pgTable('accounts', {
  hh_id: text('hh_id').notNull(),
  date_of_date: integer('date_of_date').notNull(),
  account_id: serial('account_id').primaryKey(),
  account_name: text('account_name').notNull(),
  account_type: text('account_type').notNull(),
  account_cost_basis: decimal('account_cost_basis', { precision: 10, scale: 2 }).notNull(),
  account_total_value: decimal('account_total_value', { precision: 10, scale: 2 }).notNull(),
  account_unrealized_gl: decimal('account_unrealized_gl', { precision: 10, scale: 2 }).notNull(),
  account_income_on_current_positions: decimal('account_income_on_current_positions', { precision: 10, scale: 2 }).notNull(),
  account_opening_date: integer('account_opening_date').notNull(),
  account_inception_date: integer('account_inception_date').notNull(),
  fee_plans: text('fee_plans').notNull(),
});

// Table for hhperformance
export const hhperformance = pgTable('hhperformance', {
  hh_id: text('hh_id').notNull(),
  household_name: text('household_name').notNull(),
  period: text('period').notNull(),
  return: decimal('return').notNull().primaryKey(),
});

// Table for household
export const household = pgTable('household', {
  hh_id: text('hh_id').notNull().primaryKey(),
  household_name: text('household_name').notNull(),
  hh_cost_basis: decimal('hh_cost_basis', { precision: 10, scale: 2 }).notNull(),
  hh_unrealized_gl: decimal('hh_unrealized_gl', { precision: 10, scale: 2 }).notNull(),
  hh_income_on_current_positions: decimal('hh_income_on_current_positions', { precision: 10, scale: 2 }).notNull(),
  hh_total_value: decimal('hh_total_value', { precision: 10, scale: 2 }).notNull(),
});

// Table for hhmaster
export const hhmaster = pgTable('hhmaster', {
  hh_id: text('hh_id').notNull().primaryKey(),
  household_name: text('household_name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zip_code: timestamp('zip_code').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
});

// Table for hhmonthlyperformance
export const hhmonthlyperformance = pgTable('hhmonthlyperformance', {
  hh_id: text('hh_id').notNull(),
  household_name: text('household_name').notNull(),
  period: integer('period').notNull(),
  return: decimal('return', { precision: 10, scale: 2 }).notNull(),
  ending_value: decimal('ending_value', { precision: 10, scale: 2 }).notNull(),
});

// Table for hhtransactions
export const hhtransactions = pgTable('hhtransactions', {
  hh_id: text('hh_id').notNull(),
  household_name: text('household_name').notNull(),
  account_id: integer('account_id').notNull(),
  account_name: text('account_name').notNull(),
  activity_type: text('activity_type').notNull(),
  description: text('description').notNull(),
  gainloss_: text('gainloss_').notNull(),
  process_date: integer('process_date').notNull(),
  quantity: text('quantity').notNull(),
  security_description: text('security_description'),
  symbol_cusip_or_code: text('symbol_cusip_or_code'),
  total_amount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  trade_date: integer('trade_date').notNull(),
  unit_price: text('unit_price').notNull(),
});

// Insert schemas
export const insertPositionsSchema = createInsertSchema(positions);
export const insertHhflowsSchema = createInsertSchema(hhflows);
export const insertAccountsSchema = createInsertSchema(accounts).omit({ account_id: true });
export const insertHhperformanceSchema = createInsertSchema(hhperformance).omit({ return: true });
export const insertHouseholdSchema = createInsertSchema(household).omit({ hh_id: true });
export const insertHhmasterSchema = createInsertSchema(hhmaster).omit({ hh_id: true });
export const insertHhmonthlyperformanceSchema = createInsertSchema(hhmonthlyperformance);
export const insertHhtransactionsSchema = createInsertSchema(hhtransactions);

// Types
export type InsertPositions = z.infer<typeof insertPositionsSchema>;
export type Positions = typeof positions.$inferSelect;
export type InsertHhflows = z.infer<typeof insertHhflowsSchema>;
export type Hhflows = typeof hhflows.$inferSelect;
export type InsertAccounts = z.infer<typeof insertAccountsSchema>;
export type Accounts = typeof accounts.$inferSelect;
export type InsertHhperformance = z.infer<typeof insertHhperformanceSchema>;
export type Hhperformance = typeof hhperformance.$inferSelect;
export type InsertHousehold = z.infer<typeof insertHouseholdSchema>;
export type Household = typeof household.$inferSelect;
export type InsertHhmaster = z.infer<typeof insertHhmasterSchema>;
export type Hhmaster = typeof hhmaster.$inferSelect;
export type InsertHhmonthlyperformance = z.infer<typeof insertHhmonthlyperformanceSchema>;
export type Hhmonthlyperformance = typeof hhmonthlyperformance.$inferSelect;
export type InsertHhtransactions = z.infer<typeof insertHhtransactionsSchema>;
export type Hhtransactions = typeof hhtransactions.$inferSelect;
