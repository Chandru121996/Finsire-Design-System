import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = { title: 'Foundations/Icons', parameters: { layout: 'padded' } }
export default meta

const names = ['home', 'dashboard', 'account_balance', 'payments', 'search', 'notifications', 'settings', 'person', 'filter_list', 'download', 'check_circle', 'warning', 'error', 'info']
const sizes = [16, 20, 24, 32]

export const MaterialSymbols: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 text-text-primary">
      <p className="text-body-small text-text-secondary">
        Google Material Symbols Rounded, Outlined and Filled. Filled is for active or selected states.
      </p>
      {[0, 1].map(fill => (
        <section key={fill} className="flex flex-col gap-3">
          <h2 className="text-heading-h5">{fill ? 'Filled' : 'Outlined'}</h2>
          {sizes.map(size => (
            <div key={size} className="flex items-center gap-4">
              <div className="w-12 text-label-small text-text-tertiary">{size}px</div>
              {names.map(name => (
                <span
                  key={name}
                  className="material-symbols-rounded"
                  style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill}, 'opsz' ${Math.max(size, 20)}` }}
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
}
