import {nextBoolean, nextDouble, nextInt} from '@nathanpb/kext/random'

const attacker = {
  weapon: { minDamage: 16, maxDamage: 20 },
  criticalChance: 0.3
}

const target = {
  armor: { minProtection: 0.1, maxProtection: 0.3 },
  takeDamage: (damage: number) => console.log(`🔪 health -= ${damage} hp 🔪`)
}

const baseDamage    = nextInt(attacker.weapon.minDamage, attacker.weapon.maxDamage)
const damageBlocked = nextDouble(target.armor.minProtection, target.armor.maxProtection)
const isCritical    = nextBoolean(attacker.criticalChance)

const damage = (baseDamage - (baseDamage * damageBlocked))
target.takeDamage(isCritical ? damage * 2 : damage)
