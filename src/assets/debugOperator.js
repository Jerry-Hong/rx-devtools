window.rxDevtool = function (Observable) {

    function debug(name) {
        const event = new CustomEvent('passDataToDevtoolsPanel', { 
            detail: { source: name, type: 'create' } 
        });
        document.dispatchEvent(event);
        return Observable.create((observer) => {
            const event = new CustomEvent('passDataToDevtoolsPanel', { 
                detail: { source: name, type: 'subscribe' } 
            });
            document.dispatchEvent(event);
            return this.subscribe((value) => {
                const event = new CustomEvent('passDataToDevtoolsPanel', { 
                    detail: {
                        source: name,
                        type: 'next',
                        data: value
                    } 
                });
                document.dispatchEvent(event);
                observer.next(value);
            }, (error) => {
                const event = new CustomEvent('passDataToDevtoolsPanel', { 
                    detail: {
                        source: name,
                        type: 'error',
                        error: error
                    } 
                });
                document.dispatchEvent(event);
                observer.error(error);
            }, () => {
                const event = new CustomEvent('passDataToDevtoolsPanel', { 
                    detail: {
                        source: name,
                        type: 'complete'
                    } 
                });
                document.dispatchEvent(event);
                observer.complete();
            });
        })
    }

    return debug;
};