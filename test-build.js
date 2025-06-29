#!/usr/bin/env node

// Simple test script to validate the build
console.log('Testing build configuration...');

// Check if package.json exists
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const packageJsonPath = join(process.cwd(), 'package.json');

if (!existsSync(packageJsonPath)) {
  console.error('❌ package.json not found');
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

console.log('✅ Package.json found');
console.log('📦 Project:', packageJson.name);
console.log('🏷️  Version:', packageJson.version);

// Check if essential dependencies are present
const requiredDeps = [
  'react',
  'react-dom',
  'vite',
  'typescript',
  'tailwindcss',
  'dexie',
  'howler',
  'recharts'
];

const missingDeps = requiredDeps.filter(dep => 
  !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
);

if (missingDeps.length > 0) {
  console.error('❌ Missing dependencies:', missingDeps.join(', '));
} else {
  console.log('✅ All required dependencies present');
}

// Check if build script exists
if (packageJson.scripts?.build) {
  console.log('✅ Build script found:', packageJson.scripts.build);
} else {
  console.error('❌ Build script not found');
}

console.log('\n📋 Available scripts:');
Object.entries(packageJson.scripts || {}).forEach(([name, script]) => {
  console.log(`  ${name}: ${script}`);
});

console.log('\n🔧 To run build manually:');
console.log('  pnpm install');
console.log('  pnpm typecheck');
console.log('  pnpm build');
console.log('  pnpm dev');