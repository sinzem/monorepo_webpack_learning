import { PluginItem } from "@babel/core";

/* (создаем плагин - функцию, в которую передаем ключевые слова, по которым она отследит ноду и удалит при сборке) */
export function removeDataTestIdBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path/* : NodePath<Program> */, state) { /* (встроенная функция, подробнее в документации) */
                const forbiddenProps = state.opts.props || []; /* (помещаем переданное название в состояние) */

                path.traverse({ /* (удаляем ноды, содержащие название) */
                    JSXIdentifier(current/* : NodePath<JSXIdentifier> */) {
                        const nodeName = current.node.name;
                        if (forbiddenProps.includes(nodeName)) {
                            current.parentPath.remove();
                        }
                    }
                })
            }
        }
    }
} /* (подключаем в buildBabelLoader.ts) */